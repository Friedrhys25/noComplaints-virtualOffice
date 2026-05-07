import { SupabaseClient } from '@supabase/supabase-js'
import { checkRole } from './action-helpers'

/** Simple boolean check for at least Regular employees. Great for frontend use (conditional rendering). */
export async function isEmployeeOrHigher(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['regular', 'manager', 'owner'])
  return hasRole
}

/** Simple boolean check for at least Managers. Great for frontend use (conditional rendering). */
export async function isManagerOrHigher(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['manager', 'owner'])
  return hasRole
}

/** Simple boolean check for Owners. Great for frontend use (conditional rendering). */
export async function isOwner(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['owner'])
  return hasRole
}
