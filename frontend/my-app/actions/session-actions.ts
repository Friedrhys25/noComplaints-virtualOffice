'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

/** Starts a new session in a room (e.g., first person to walk in) */
export async function startSession(roomId: number) {
  const supabase = createClient(await cookies())
  
  const { data, error } = await supabase
    .from('sessions')
    .insert({ room_id: roomId })
    .select()
    .single()

  if (error) throw error
  return data 
}

/** Ends new session (e.g., no more people in the room) */
export async function endSession(sessionId: number) {
  const supabase = createClient(await cookies())
  
  const { data, error } = await supabase
    .from('sessions')
    .update({ ended_at: new Date().toISOString() })
    .eq('id', sessionId)

  if (error) throw error
  return data 
}


/** Adds a user to an active session */
export async function joinSession(sessionId: string) {
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('session_participants')
    .insert({
      user_id: user?.id,
      session_id: sessionId
    })

  if (error) throw error
}

/** Records when a user leaves */
export async function leaveSession(participantId: string) {
  const supabase = createClient(await cookies())

  const { error } = await supabase
    .from('session_participants')
    .update({ left_at: new Date().toISOString() })
    .eq('id', participantId)

  if (error) throw error
}