"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

const CreateWorkspace = () => {
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      
      const response = await fetch("/api/workspaces", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (response.status === 201) {
        router.push("/dashboard", { forceOptimisticNavigation: true })
        toast({
          description: "Your message has been sent.",
        })
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className=" container flex  h-screen  flex-col items-center justify-center">
          <h1 className="mb-10 text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Workspace
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 md:w-[400px]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit">
                {" "}
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next
              </Button>
            </form>
          </Form>
        </section>
      </main>
    </div>
  )
}

export default CreateWorkspace
