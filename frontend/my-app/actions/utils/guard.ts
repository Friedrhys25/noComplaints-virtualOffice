import { SupabaseClient } from '@supabase/supabase-js'
import { checkRole } from './action-helpers'

/** 
 * The 'Gatekeeper' - all other guards use this 
 * 
 * Returns the user object for convenience.
 */
async function requireUserLoggedIn(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')
  return user
}

/** 
 * Ensures the user is logged in AND is a Regular employee of the office.
 * Great for backend use for security.
 * 
 * Returns the user object for convenience.
 */
export async function requireEmployee(supabase: SupabaseClient, officeId: string) {
  const user = await requireUserLoggedIn(supabase)
  const { hasRole } = await checkRole(supabase, user.id, officeId, ['regular', 'manager', 'owner'])
  if (!hasRole) throw new Error('Unauthorized: User must be an employee of this office')

  return user
}

/** 
 * Ensures the user is logged in AND is either a Manager or Owner.
 * Great for backend use for security.
 * 
 * Returns the user object for convenience.
 */
export async function requireManagerOrOwner(supabase: SupabaseClient, officeId: string) {
  const user = await requireUserLoggedIn(supabase)
  const { hasRole } = await checkRole(supabase, user.id, officeId, ['manager', 'owner'])
  if (!hasRole) throw new Error('Unauthorized: Manager or Owner status required')

  return user
}

/** 
 * Ensures the user is logged in AND is an Owner.
 * Great for backend use for security.
 * 
 * Returns the user object for convenience.
 */
export async function requireOwner(supabase: SupabaseClient, officeId: string) {
  const user = await requireUserLoggedIn(supabase)
  const { hasRole } = await checkRole(supabase, user.id, officeId, ['owner'])
  if (!hasRole) throw new Error('Unauthorized: Owner status required')

  return user
}