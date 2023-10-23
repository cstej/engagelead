"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { Info, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
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
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { motion } from "framer-motion"

type Props = {}
const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters long"),
})

const isEmailExists = async (email: string) => {
  const res = await fetch(`/api/user/${email}`)
  if (res.status === 200) {
    const { isUser } = (await res.json()) as { isUser: boolean }
    return isUser
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

  const debouncedEmail = useDebounce(form.watch("email"), 500)

  useQuery(
    ["isEmailExists", debouncedEmail],
    () => isEmailExists(debouncedEmail),
    {
      enabled: !!debouncedEmail,
      onSuccess: (data) => {
        if (data) {
          form.setError("email", {
            type: "validate",
            message: "Email already exists",
          })
        } else {
          form.clearErrors("email")
        }
      },
    }
  )

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
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative flex h-[80vh] w-screen flex-col items-center justify-center">
      <div className="absolute inset-0 -z-40 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] "></div>
      <div className="container grid max-w-xl items-center gap-8  ">
        <Card className="shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-6">
              <Button variant="outline" className="w-full">
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
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              form="signup"
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
          </CardFooter>

          <div className=" flex flex-col flex-wrap  space-y-2 p-6 pt-0">
            <div className=" text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="font-medium hover:underline" href="/login">
                Login
              </Link>
            </div>
            <div className=" text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and our Privacy
              Policy
            </div>
          </div>

          {/* Signup Form End Here */}
        </Card>
      </div>
    </div>

    </motion.div>
  )
}

export default SignupPage
