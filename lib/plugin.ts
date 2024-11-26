import type { BetterAuthPlugin } from 'better-auth'
import { createAuthMiddleware } from 'better-auth/plugins'
import { NextResponse } from 'next/server'
import { authClient } from '@/lib/authClient'

// const myPlugin = {
//   id: 'middleware',
//   middleware: [
//     {
//       path: './Dashboard/*',
//       middleware: createAuthMiddleware(async (request) => {
//         const data = await authClient.getSession()

//         // If the user is authenticated, continue as normal
//         if (data !== undefined || data !== null) {
//           return NextResponse.next()
//         }

//         // Redirect to login page if not authenticated
//         return NextResponse.redirect(new URL('/LogIn'))
//       }),
//     },
//   ],
// }

// export default myPlugin
