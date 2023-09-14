"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

import { leadSource, leadStatus } from "../data/data"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type Props = {}

const formSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(10).trim(),
  lead_source: z.string(),
  lead_status: z.string(),
  assigned_to: z.string(),
})

export default function AddLead({}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      
      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (response.status === 201) {
        router.push("/app/dashboard/leads",)
        toast({
          description: "Lead has been recorded.",
        })
 
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="flex justify-between">
      <div>
        <h3 className="text-lg font-medium">New Lead</h3>
        <p className="text-sm text-muted-foreground">
        Add potential customers to your database.
        </p>
      </div>
        <div className="flex gap-4">
          <Button variant={"outline"}>
            {" "}
            <UploadIcon className="mr-2" /> Bulk Upload
          </Button>
        </div>
      </div>
      <Separator/>
      <div className="w-full rounded-md border p-6">
        <Form {...form}>
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10"
                      placeholder="Enter the name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the email..." {...field} />
                  </FormControl>
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
                    <Input
                    maxLength={10}
                      type="number"
                      placeholder="Enter the phone..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lead_status"
              render={({ field }) => (
                <FormItem className="col-start-1">
                  <FormLabel>Lead Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leadStatus?.map((lead) => (
                        <SelectItem value={lead.value}>{lead.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lead_source"
              render={({ field }) => (
                <FormItem className="col-start-2">
                  <FormLabel>Lead Source</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leadSource?.map((lead) => (
                        <SelectItem value={lead.value}>{lead.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assigned_to"
              render={({ field }) => (
                <FormItem className="col-start-1 ">
                  <FormLabel>Assign Lead</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leadSource?.map((lead) => (
                        <SelectItem value={lead.value}>{lead.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="col-span-2" />
            <div className=" col-start-2 mt-6 flex justify-end">
              <Button disabled={isLoading} type="submit">
                {" "}
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
