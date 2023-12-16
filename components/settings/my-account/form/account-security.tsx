"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import PasswordInput from "@/components/ui/password-input"
import { api } from "@/components/providers/trpc-react"

type Props = {}

function AccountSecurity({}: Props) {
  const formDataSchema = z
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

  type FormData = z.infer<typeof formDataSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  })

  const mutation = api.user.updatePassword.useMutation({
    onSuccess: () => {
      form.reset()
      toast.success("Password updated successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSubmit = (value: FormData) => {
    mutation.mutate(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative overflow-hidden shadow-none">
          <CardHeader className=" border-b">
            <CardTitle className="mb-2">Security</CardTitle>

            {/* Todo */}
            {/* <CardDescription className="hidden md:block">
              Change your password.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="my-4 space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <PasswordInput placeholder="Current Password" {...field} />
                  <FormDescription>
                    For your security, you must enter your current password in
                    order to make changes to your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel placeholder="New Password">New Password</FormLabel>
                  <PasswordInput {...field} />
                  <FormDescription>
                    Enter your new password here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <PasswordInput
                    placeholder="Confirm Password"
                    {...field}
                    isVisible
                  />
                  <FormDescription>
                    Re-enter your new password to confirm it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end overflow-hidden  border-t bg-primary-foreground p-3">
            <Button
              type="submit"
              variant={"default"}
              className="font-medium"
              isLoading={mutation.isLoading}
              loadingText="Updating Password"
            >
              Change Password
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default AccountSecurity
