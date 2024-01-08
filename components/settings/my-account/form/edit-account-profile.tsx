"use client"

import React, { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AtSign } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/components/providers/trpc-react"

const formDataSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  about: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().length(10).optional(),
})

type FormData = z.infer<typeof formDataSchema>

type Props = {
  initialData?: FormData
}

export default function EditAccountProfile() {
  const { isLoading, data: profileData } = api.user.getMyProfile.useQuery(
    undefined,
    {
      staleTime: Infinity,
    }
  )

  const utils = api.useUtils()
  const mutation = api.user.updateMyProfile.useMutation({
    onSuccess: (value) => {
      utils.user.getMyProfile.invalidate()
      // form.reset(value)
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  })

  //Handle Form Submit
  async function onSubmit(value: FormData) {
    mutation.mutate(value)
  }

  React.useEffect(() => {
    if (isLoading === false && profileData) {
      // @ts-ignore
      form.reset(profileData!)
    }
  }, [isLoading, form, profileData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative  overflow-hidden shadow-none">
          <CardHeader className=" border-b">
            <CardTitle>My Account</CardTitle>
            <CardDescription className="hidden md:block">
              Customize and manage your account effortlessly.
            </CardDescription>
          </CardHeader>

          {isLoading ? (
            <div className="p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="my-4 h-8 space-y-4" />
              ))}
            </div>
          ) : (
            <CardContent className="my-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This name will be displayed publicly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide a brief description of yourself.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                disabled
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        prefix={<AtSign className="h-4 w-4" />}
                        placeholder="Your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This email will be displayed publicly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="91XXXXXXXX" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          )}

          <CardFooter className="flex justify-end overflow-hidden  border-t bg-primary-foreground p-3">
            <Button
              disabled={isLoading || !form.formState.isDirty}
              type="submit"
              loadingText="Saving"
              isLoading={mutation.isLoading}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
