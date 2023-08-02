"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { UserAvatar } from "../../components/user-avatar"
import useWorkspaceStore from "@/store/client/workspaceStore"

type Props = {}

const formSchema = z.object({
  name: z.string().min(2),
  user: z.string().min(2),
})

type User = {
  id: string
  email: string
  emailVerified: string | null
  name: string
  image: string | undefined
  role: string
}

type Workspace = {
  _id: string
  name: string
  users: User[]
}

const inviteFormSchema = z.object({
  email: z.string().email(),
  role: z.string(),
})

export default function WorkspaceSetting({}: Props) {
  
  const [data, setData] = useState<Workspace | null>(null)

  const workspace =  useWorkspaceStore((state)=> state.workspace)


  const [isLoading, setLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      try {
        const res = await fetch(`/api/workspaces/${workspace?.id}`, {
          method: "GET",
        })
        const {data} = await res.json()
        setData(data)
        setLoading(false)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    mode: "onChange",
  })

  const inviteForm = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
    },
  })


  function onInviteFormSubmit(values: z.infer<typeof inviteFormSchema>){



  }

  return (
    <>
      <div className="space-y-6">
     
      <div>
        <h3 className="text-lg font-medium">Workspace</h3>
        <p className="text-sm text-muted-foreground">
        Customize and manage your team&apos;s workspace effortlessly.
        </p>
      </div>
      <Separator />
     
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="max-w-[400px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Card className="mt-6 shadow-none">
          <CardHeader>
            <CardTitle>Manage Team</CardTitle>
            <CardDescription>
              Manage your team and their respective roles within Workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 ">
              <div className="h-fit flex-1 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.users?.map((user) => (
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <UserAvatar
                            user={{ name: user.name, image: user.image }}
                            className="h-8 w-8"
                          />
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Select disabled={isLoading} defaultValue={user.role}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="MANAGER">Manager</SelectItem>
                                <SelectItem value="SALES_AGENT">
                                  Sales Agent
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/*Invite Container */}

              <Card className="min-w-fit">
                <CardHeader>
                  <CardTitle>Invite Members</CardTitle>
                  <CardDescription>
                    Invite your team members to collaborate.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...inviteForm}>
                    <form onSubmit={inviteForm.handleSubmit(onInviteFormSubmit)} className=" grid gap-2">
                      <FormField
                        name="email"
                        control={inviteForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="johndoe@example.com"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        name="role"
                        control={inviteForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Select {...field} disabled={isLoading}>
                                  <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Select Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="ADMIN">
                                        Admin
                                      </SelectItem>
                                      <SelectItem value="MANAGER">
                                        Manager
                                      </SelectItem>
                                      <SelectItem value="SALES_AGENT">
                                        Sales Agent
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />

                      <Button className="mt-2">Send Invitation</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
   
    </>
  )
}
