import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createUserSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8),
})

export async function userRegistration(req: NextRequest) {
  try {

    const userData = createUserSchema.parse(await req.json())

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (!!existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Hash the password using BCrypt
    const saltRounds = 10 
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
      },
    })

    return NextResponse.json({ user: newUser })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}

export { userRegistration as POST }
