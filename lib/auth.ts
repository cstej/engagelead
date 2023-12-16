
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User as UserModel } from "@prisma/client"
import bcrypt from "bcrypt"
import _ from "lodash"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { prisma } from "./prisma"

declare module "next-auth" {
  interface User
    extends Omit<UserModel, "password" | "createdAt" | "updatedAt" | "about"> {}
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    CredentialsProvider({
      name: "login",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const dbUser = await prisma.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            image: true,
            name: true,
            emailVerified: true,
            password: true,
          },
        })

        if (dbUser !== null) {
          const isMatched = await bcrypt.compare(
            password,
            dbUser.password || ""
          )
          if (isMatched) {
            return {
              id: dbUser.id,
              email: dbUser.email,
              image: dbUser.image,
              name: dbUser.name,
              emailVerified: dbUser.emailVerified,
            }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
 

      return true
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })
      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
  },
}
