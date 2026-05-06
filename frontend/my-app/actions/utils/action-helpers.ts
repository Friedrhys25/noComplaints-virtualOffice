import { SupabaseClient } from '@supabase/supabase-js'

/** INTERNAL HELPER: The engine that actually checks the DB */
export async function checkRole(supabase: SupabaseClient, userId: string, officeId: string, allowedRoles: string[]) {
  const { data, error } = await supabase
    .from('memberships')
    .select('type')
    .eq('user_id', userId)
    .eq('office_id', officeId)
    .in('type', allowedRoles)
    .single()

  return { hasRole: !!data && !error, role: data?.type }
}