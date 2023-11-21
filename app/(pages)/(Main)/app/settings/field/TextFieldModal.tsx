"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Baseline } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

import { AddFieldDefination } from "./action"

const TextFieldModal = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const formSchema = z.object({
    fieldName: z.string().min(2).max(50),
    fieldType: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldName: "",
      fieldType: "Text",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await AddFieldDefination(values)
      setIsDialogOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isDialogOpen) {
      form.reset()
    }
  }, [isDialogOpen, form])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex h-12 cursor-pointer items-center justify-center border">
          <Baseline className="mr-2" /> Text
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Field</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 ">
          <Form {...form}>
            <form
              id="textfieldform"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 "
            >
              <FormField
                control={form.control}
                name="fieldType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Type</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fieldName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="gap-2">
          <Button
            form="textfieldform"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Saving
              </>
            ) : (
              <>Save</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TextFieldModal
