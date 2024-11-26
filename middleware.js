import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { authClient } from './lib/authClient'

export async function middleware(request) {
  // console.log('AAAAAAAAAAAAAAAAAAAAAA:', request)

  const isAuthed = (await request.headers.get('cookie')) || ''
  // console.log('BBBBBBBBBBBBBBBBBBBBBBBBB:', isAuthed)
  const returnURL = request.url

  if (!isAuthed) {
    return NextResponse.redirect(new URL(`/LogIn?returnTo=${returnURL}`, returnURL))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/Dashboard/:path*',
}
