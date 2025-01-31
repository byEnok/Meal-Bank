import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { authClient } from './lib/authClient'

export async function middleware(request) {
  // const user = await authClient.getSession()
  const isAuthed = await authClient.getSession()
  if (!isAuthed) {
    return NextResponse.redirect(new URL(`/LogIn?returnTo=${returnURL}`, returnURL))
  }
}

export const config = {
  matcher: '/Dashboard/:path*',
}
