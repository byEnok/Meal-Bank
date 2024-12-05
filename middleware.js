import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { authClient } from './lib/authClient'

export async function middleware(request) {
  const isAuthed = (await request.headers.get('cookie')) || ''
  const returnURL = request.url

  // HAR BRUK DEN UNDER OG DEN FUNKET FINT - TESTER BARE KJAPT MED UTEN "returnTo= tingen"
  if (!isAuthed) {
    return NextResponse.redirect(new URL(`/LogIn`))
  }
  // if (!isAuthed) {
  //   return NextResponse.redirect(new URL(`/LogIn?returnTo=${returnURL}`, returnURL))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: '/Dashboard/:path*',
}
