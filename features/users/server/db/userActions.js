'use server'
// import { signUp } from '@/lib/authClient'
// import { auth } from '@/lib/auth'
import { auth } from '../../../../lib/auth'
import prisma from '../../../../lib/prismaClient'
import { cache } from 'react'
import { headers } from 'next/headers'

// USER DATA WITH REACT CACHE
export const CachedUserSession = cache(async (userId) => {
  const cachedData = await auth.api.getSession({
    headers: headers(),
  })
  return cachedData
})

export const UserSession = async () => {
  const data = await auth.api.getSession({
    headers: headers(),
  })
  const userData = CachedUserSession(data.user.id)
  return userData
}

// export async function UserSession() {
//   const data = await auth.api.getSession({
//     headers: headers(),
//   })
//   return data
// }

// USER DATA WITHOUT REACT CACHE
// export async function UserSession() {
//   const session = await auth.api.getSession({
//     headers: headers(),
//   })
//   console.log('JS FILE:', session)
//   return session
// }
//
// async function ActiveSession() {
//   const { data: user, session } = await auth.api.getSession({
//     headers: headers({}),
//   })
//   console.log('Session Status:', session, 'User Status:', user)
//   let result = Boolean

//   if (!session || !user) {
//     result = false
//   } else {
//     result = true
//   }
//   return result
// }

//  Fetch current session on the server side or in contexts where you want to retrieve the session data once without reactivity.
// export async function UserAuth() {
//   const { data, error } = await authClient.getSession()

//   if (!data || data === null || undefined) {
//     return { userData: { user: undefined, success: false, error: 'Data is null | undefined:', error } }
//   }

//   try {
//     const userData = await prisma.session.findUnique({
//       where: { id: data.session.id },
//     })

//     if (!data || data === null || data === undefined || new Date(data.session.expiresAt) < new Date()) {
//       return { userData: { ...data, success: false } }
//     }

//     return { userData: { ...userData, success: true } }
//     // const test = console.log('ID === sessionToken.name')
//     // return test
//   } catch (error) {
//     console.error('Could not get User data! Error:', error)
//   }
// }

// export async function UserAuth() {
//   const sessionToken = getCookies()

//   if (sessionToken.name || sessionToken.options === undefined) {
//     return { session: { sessionToken: undefined, user: undefined, success: false } }
//   }

//   try {
//     const sessionData = await prisma.session.findUnique({
//       where: { id: sessionToken.name },
//       include: { user: true },
//     })

//     if (!sessionData || new Date(sessionData.expiresAt) < new Date()) {
//       return { session: { ...sessionData, success: false } }
//     }

//     // return { session: { ...sessionData, success: true } }
//     const test = console.log('ID === sessionToken.name')
//     return test
//   } catch (error) {
//     console.error('Could not get User Session! Error:', error)
//   }
// }

// export const ClientUserData = () => {
//   'use client'
//   return authClient.useSession()
// }

// export async function HandleRequests(request, success, error) {}

// export async function CreateUser(formData) {
//   try {
//     await auth.signUp.email({
//       email: formData.get('email'),
//       password: formData.get('password'),
//       name: formData.get('name'),
//       image: image ? convertImageToBase64(image) : undefined,
//     })
//   } catch (e) {
//     console.error('Sign-up error:', e)
//   }
// }

// export async function SendVerificationMail(user, url, token) {}

// async function UserSession() {

// }

// const userDB = [
//   ActiveSession,
//   UserSession,
//   userData,
// ]

// export default userDB
