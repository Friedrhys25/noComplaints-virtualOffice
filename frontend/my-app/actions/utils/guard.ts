import { SupabaseClient } from '@supabase/supabase-js'
import { checkRole } from './action-helpers'
import { redirect } from 'next/dist/client/components/navigation'

/** 
 * The 'Gatekeeper' - all other guards use this 
 * 
 * Returns the user object for convenience.
 */
async function requireUserLoggedIn(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/register?error=unauthenticated')
  return user
}

/** 
 * Ensures the user is logged in AND is a Regular employee of the office.
 * Great for backend use for security.
 * 
 * Returns the user object for convenience.
 */
export async function requireEmployeeOrHigher(supabase: SupabaseClient, officeId: string) {
  const user = await requireUserLoggedIn(supabase)
  const { hasRole } = await checkRole(supabase, user.id, officeId, ['regular', 'manager', 'owner'])
  if (!hasRole) redirect('/offices?error=not_employed_there')
  return user
}

/** 
 * Ensures the user is logged in AND is either a Manager or Owner.
 * Great for backend use for security.
 * 
 * Returns the user object for convenience.
 */
export async function requireManagerOrHigher(supabase: SupabaseClient, officeId: string) {
  const user = await requireUserLoggedIn(supabase)
  const { hasRole } = await checkRole(supabase, user.id, officeId, ['manager', 'owner'])
  if (!hasRole) redirect('/offices?error=not_admin_there')

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
  if (!hasRole) redirect('/offices?error=not_owner_there')

  return user
}