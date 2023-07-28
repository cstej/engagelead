"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type Props = {}
const formSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .refine(
      async (email) => {
        if (!email.match(/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
          
          return false
        }
        return isEmailExists(email)
      },
      {
        message: "This email is already registered.",
      }
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

const isEmailExists = async (email: string) => {
  const res = await fetch(`/api/user/${email}`,)
  if (res.status === 200) {
    const { user } = await res.json()
    return !user
  }
}
const SignupPage = (props: Props) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("from") ?? "/"
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (res.status === 200) {
        toast({ title: "🎉 Congratulations! Your Account is Created." })
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl,
        })
      }
    } catch (error) {}
  }
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className=" w-full sm:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Signup Form Start Here */}

            <Form {...form}>
              <form
                id="signup"
                className="grid gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Password</FormLabel>
                        <Info className=" inline h-4 w-4" />
                      </div>

                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="signup" className="w-full">
              Create account
            </Button>
          </CardFooter>

          {/* Signup Form End Here */}
        </Card>
      </div>
    </div>
  )
}

export default SignupPage
