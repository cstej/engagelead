"use client"


import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDebounce } from "@uidotdev/usehooks"
import { Info } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
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
import { Icons } from "@/components/icons"
import { useQuery } from "@tanstack/react-query"

type Props = {}

const Login = (props: Props) => {


  const isEmailExists = async (email: string) => {
    const res = await fetch(`/api/user/${email}`)
    if (res.status === 200) {
      const { isUser } = (await res.json()) as { isUser: boolean }
      return isUser
    }
  }

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })



  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("from") ?? "/"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const debouncedEmail = useDebounce(form.watch("email"), 1000)

  useQuery(["isEmailExists", debouncedEmail], () => isEmailExists(debouncedEmail), {
    enabled: !!debouncedEmail,
    onSuccess: (data) => {
      if (!data) {
        form.setError("email", {
          type: "validate",
          message: "Oops! Looks like you don't have an account yet.",
        })
      }else{
        form.clearErrors("email")
      }
    },
  })
  


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
      })
    } catch (error) {}
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
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
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to log in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button
                onClick={() => signIn("google", { callbackUrl })}
                variant="outline"
              >
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

            {/* Login Form Start Here */}

            <Form {...form}>
              <form
                id="login"
                className="grid gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
            <Button type="submit" form="login" className="w-full">
              Login
            </Button>
          </CardFooter>

          {/* Login Form End Here */}
        </Card>
      </div>
    </div>
  )
}

export default Login
