"use client"

import React, { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import FormLoadingSkeleton from "@/components/form/form-loading"
import { api } from "@/components/providers/trpc-react"

const formDataSchema = z.object({
  name: z.string().min(2),
  about: z.string().optional(),
})

type FormData = z.infer<typeof formDataSchema>

type Props = {
  initialData?: FormData
}

export default function EditWorkspaceProfile() {
  const { data: workspaceData, isLoading } =
    api.workspace.getWorkspaceById.useQuery(undefined, {
      staleTime: Infinity,
    })

  const utils = api.useUtils()

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  })

  const mutation = api.workspace.updateWorkspaceById.useMutation({
    onSuccess: (value) => {
      utils.workspace.getWorkspaceById.invalidate()
    },
  })

  //Handle Form Submit
  async function onSubmit(value: FormData) {
    mutation.mutate(value)
  }

  React.useEffect(() => {
    if (isLoading === false && workspaceData) {
      // @ts-ignore
      form.reset(workspaceData!)
    }
  }, [isLoading, form, workspaceData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative  overflow-hidden shadow-none">
          <CardHeader className=" border-b">
            <CardTitle>Workspace</CardTitle>
            <CardDescription className="hidden md:block">
              Customize and manage your team&apos;s workspace effortlessly.
            </CardDescription>
          </CardHeader>

          {isLoading ? (
            <FormLoadingSkeleton length={2} />
          ) : (
            <CardContent className="my-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} />
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
                      Please provide a brief description of your workspace.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          )}

          <CardFooter className="flex justify-end overflow-hidden  border-t bg-primary-foreground p-3">
            <Button
              loadingText="Saving"
              disabled={isLoading || !form.formState.isDirty}
              type="submit"
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
