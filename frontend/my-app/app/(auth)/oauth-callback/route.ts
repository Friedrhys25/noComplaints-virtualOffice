import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' 
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    
    // Exchange the code for a session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/offices`) // Send them to the dashboard!
    }
  }

  // If something breaks, send them back to login
  return NextResponse.redirect(`${origin}/login?error=OAuth_Failed`)
}