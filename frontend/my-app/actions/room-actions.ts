'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { requireManagerOrOwner } from './utils/guard'


export async function createRoom(officeId: string, name: string, type: string) {
    const supabase = createClient(await cookies())
    const user = await requireManagerOrOwner(supabase, officeId)

    const { error } = await supabase
        .from('rooms')
        .insert({
            office_id: officeId,
            owner_id: user?.id,
            name,
            type
        })
        
    if (error) throw error
}

export async function deleteRoom(roomId: string, officeId: string) {
    const supabase = createClient(await cookies())
    await requireManagerOrOwner(supabase, officeId)

    const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId)

    if (error) throw error
}

export async function assignRoomOwner(room_id: string, owner_id: string, officeId: string) {
    const supabase = createClient(await cookies())
    await requireManagerOrOwner(supabase, officeId)
 
    const { error } = await supabase
        .from('rooms')
        .update({ owner_id })
        .eq('id', room_id)

    if (error) throw error
}