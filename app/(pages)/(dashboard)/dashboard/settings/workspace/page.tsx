"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {}

export const formSchema = z.object({
  name: z.string().min(2),
  user: z.string().min(2),
})

export default function WorkspaceSetting({}: Props) {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
 
  useEffect(() => {
    setLoading(true)

    fetch('/api/workspaces/:users', {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  console.log(data)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <>
      <div>
        <div className="pb-8 text-2xl font-semibold tracking-wide">
          <p>Workspace</p>
          <Separator className="mt-2" />
        </div>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace</FormLabel>
                  <FormControl>
                    <Input className="max-w-[400px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-10 pb-8 text-xl font-semibold tracking-wide">
              <p>My Team</p>
              <Separator className="mt-2" />
            </div>

            <div className="rounded-md border">
              <Table>
                {/* <TableCaption>A list of your Teams.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
