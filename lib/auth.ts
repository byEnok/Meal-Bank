import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins'
import { prismaAdapter } from 'better-auth/adapters/prisma'
// import { SendVerificationMail } from '@/features/users/server/db/userDB'
import prisma from './prismaClient'
// import myPlugin from '@/lib/plugin'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // emailVerification: {
  //   sendVerificationEmail: async (user, url, token) => {
  //     await SendVerificationMail({
  //       to: user.email,
  //       subject: 'Welcome To Meal Bank!',
  //       text: `Verify your account and start creating your meals here: ${url}`,
  //     })
  //   },
  // },
  plugins: [username()],
  advanced: {
    useSecureCookies: true,
    sameSite: 'None',
  },
})
