'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

/** Logic for starting a meeting within a session */
export async function startMeeting(sessionId: string) {
  const supabase = createClient(await cookies())

  const { data, error } = await supabase
    .from('meetings')
    .insert({ session_id: sessionId})
    .select()
    .single()

  if (error) throw error
  
  return data
}

/** Logic for ending a meeting within a session */
export async function endMeeting(sessionId: string) {
  const supabase = createClient(await cookies())

  const { data, error } = await supabase
    .from('meetings')
    .update({ ended_at: new Date().toISOString() })
    .eq('session_id', sessionId)

  if (error) throw error
  return data
}