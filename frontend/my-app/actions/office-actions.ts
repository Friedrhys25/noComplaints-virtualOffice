'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * `formData` should contain: 
 * - `name` :: string
 */
export async function createOffice(formData: FormData) {
    const supabase = createClient(await cookies())
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const name = formData.get('name') as string

    // 1. Create the office
    const { data: office, error: officeError } = await supabase
        .from('offices')
        .insert({ name })
        .select()
        .single()

    if (officeError) throw officeError

    // 2. Automatically make the creator an 'owner' member
    await supabase
        .from('memberships')
        .insert({
            user_id: user.id,
            office_id: office.id,
            type: 'owner'
        })

    revalidatePath('/dashboard')
    redirect(`/offices/${office.id}`) // TODO: redirect to specific office URL
}

export async function joinOffice(invite_code: string) {
    const supabase = createClient(await cookies())
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized user")

    // 1 - Retrieve the office associated with the invite code
    const { data: invitations, error: invitationsError } = await supabase
        .from('invitations')
        .select()
        .eq('invite_code', invite_code)
        .single()   

    if (invitationsError) throw new Error(`Invalid invite code "${invite_code}". Full error: ${invitationsError.message}`)

    // 2 - Add the user to the office's members
    const { error } = await supabase
        .from('memberships')
        .insert({
            user_id: user.id,
            office_id: invitations.office_id,
            type: 'regular'
        })

    if (error) throw error
    revalidatePath('/dashboard')
}