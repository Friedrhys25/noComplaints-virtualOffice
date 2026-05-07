import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { requireEmployeeOrHigher } from '@/actions/utils/guard'

export default async function OfficeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ officeId: string }>
}) {
  const { officeId } = await params; 

  const supabase = createClient(await cookies())
  
  try {
    await requireEmployeeOrHigher(supabase, officeId)
  } catch (e) {
    redirect('/offices?error=not_employed_there')
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}