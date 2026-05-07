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
  
  await requireEmployeeOrHigher(supabase, officeId)

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}