"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, UploadIcon } from "@radix-ui/react-icons"
import { QueryKey, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { leadSource, leadStatus } from "../data/data"
import { useWorkspaceMembersStore } from "@/store/client"

type Props = {}

const formSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(10).trim(),
  lead_source: z.string(),
  lead_status: z.string(),
  assigned_to: z.string(),
  customFields: z.record(z.unknown()).optional(),
})

type CustomFieldDefination = {
  id: string
  workspaceId: string
  name: string
  type: string
  options: string[]
  label?: string
}

export default function AddLead({}: Props) {
  const [customFieldDefination, setCustomFieldDefination] = React.useState<
    CustomFieldDefination[]
  >([])

  const {members,} = useWorkspaceMembersStore()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  // fetch custom field defination

  const { data } = useQuery(
    ["customFieldDefination"],
    async () => {
      const response = await fetch("/api/field-defination")
      const data = await response.json()

      return data as CustomFieldDefination[]
    },
    {
      onSuccess: (data) => {
        setCustomFieldDefination(data)
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  useEffect(() => {
    if (data) {
      setCustomFieldDefination(data)
    }
  }, [data])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const allFields = form.getValues()
      setIsLoading(true)

      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(allFields),
      })

      if (response.status === 201) {
        router.push("/app/leads")
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
      <Separator />
      <div>
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
                      {members?.map((member) => (
                        <SelectItem value={member.id}>{member.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
         

            {
          
            customFieldDefination?.map((fieldDefination) => (
              <>
                {fieldDefination.type === "Text" && (
                  <FormField
                    key={fieldDefination.id}
                    control={form.control}
                    name={`customFields.${fieldDefination.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldDefination.label}</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                            className="h-10"
                            placeholder={`Enter ${fieldDefination.label}...`}
                            {...field}
                            value={field.value as string}
              
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {fieldDefination.type === "Number" && (
                  <FormField
                    key={fieldDefination.id}
                    control={form.control}
                    name={`customFields.${fieldDefination.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldDefination.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-10"
                            placeholder={`Enter ${fieldDefination.label}...`}
                            {...field}
                          value={field.value as number} 
                          
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {fieldDefination.type === "Date" && (
                  <FormField
                    key={fieldDefination.id}
                    control={form.control}
                    name={`customFields.${fieldDefination.id}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{fieldDefination.label}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value as Date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value as Date}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            ))}

            <Separator className="col-span-2 mt-4" />
            <div className=" col-span-2 mt-4 flex justify-end">
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
