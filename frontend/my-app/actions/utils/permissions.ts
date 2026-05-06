import { SupabaseClient } from '@supabase/supabase-js'
import { checkRole } from './action-helpers'

/** Simple boolean check for Regular employees. Great for frontend use (conditional rendering). */
export async function isEmployee(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['regular'])
  return hasRole
}

/** Simple boolean check for Managers. Great for frontend use (conditional rendering). */
export async function isManager(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['manager'])
  return hasRole
}

/** Simple boolean check for Owners. Great for frontend use (conditional rendering). */
export async function isOwner(supabase: SupabaseClient, userId: string, officeId: string) {
  const { hasRole } = await checkRole(supabase, userId, officeId, ['owner'])
  return hasRole
}
