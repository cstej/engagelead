import { TRPCError } from "@trpc/server"
import bcrypt from "bcrypt"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        about: true,
        phone: true,
      },
    })

    return user
  }),

  updateMyProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(255),
        image: z.string().optional(),
        about: z.string().optional(),
        phone: z.string().length(10).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.userId,
          },
          data: {
            name: input.name,
            image: input.image,
            about: input.about,
            phone: input.phone,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            about: true,
            phone: true,
          },
        })

        return user
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the user",
        })
      }
    }),

  updatePassword: protectedProcedure
    .input(
      z
        .object({
          password: z.string(),
          confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
          }),
          currentPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Password and Confirm Password must match",
          path: ["confirmPassword"],
        })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.userId },
      })

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        })
      }

      if (!user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not have a password",
        })
      }

      const valid = await bcrypt.compare(input.currentPassword, user.password)

      if (!valid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is incorrect",
        })
      }

      const hashedPassword = await bcrypt.hash(input.password, 10)

      try {
        const updatedUser = await ctx.prisma.user.update({
          where: { id: ctx.session.userId },
          data: { password: hashedPassword },
        })

        return true
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the user",
        })
      }
    }),

  signUpUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50).trim(),
        email: z
          .string()
          .email("Please enter a valid email address")
          .toLowerCase()
          .trim(),

        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })

      if (!!existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User with this email already exists",
        })
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(input.password, saltRounds)

      try {
        const newUser = await ctx.prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
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

        return newUser
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the user",
        })
      }
    }),
})
