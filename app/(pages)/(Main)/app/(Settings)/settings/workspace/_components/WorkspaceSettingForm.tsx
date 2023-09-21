"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { workspaceWithMembersSchema } from "@/lib/zodSchemas"
import { Badge } from "@/components/ui/badge"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

import { UserAvatar } from "../../../../_components/user-avatar"
import { updateWorkspace } from "../../actions"
import MemberInviteModal from "./MemberInviteModal"
import { RoleModal } from "./RoleModal"

const workspaceFormSchema = workspaceWithMembersSchema

type Props = {
  workspace: z.infer<typeof workspaceWithMembersSchema>
}

const WorkspaceSettingsForm = ({ workspace }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)



  const workspaceForm = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      name: workspace.name,
      id: workspace.id,
      members: workspace.members,
    },
    mode: "onChange",
  })

  useEffect(() => {
    workspaceForm.reset({
      name: workspace.name,
      id: workspace.id,
      members: workspace.members,
    })
  }, [workspace, workspaceForm])

  async function handleUpdateWorkspace(
    values: z.infer<typeof workspaceFormSchema>
  ) {
    setIsSubmitting(true)
    const result = await updateWorkspace(values)
    setIsSubmitting(false)

    if (result?.error) {
      toast({
        title: result.error,
        description: "There was a problem with your request.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Workspace Updated",
        description: "Your workspace has been updated successfully.",
        variant: "default",
      })
    }
  }

  return (
    <>
      <Form {...workspaceForm}>
        <form
          id="workspaceSettingsForm"
          onSubmit={workspaceForm.handleSubmit(handleUpdateWorkspace)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={workspaceForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} className="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex justify-end">
        <MemberInviteModal />
      </div>
      <Card className=" shadow-none">
        <CardHeader>
          <CardTitle>Manage Team</CardTitle>
          <CardDescription>
            Manage your team and their respective roles within the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workspaceForm.getValues("members")?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="flex items-center gap-2">
                      <UserAvatar
                        user={{
                          name: member.name,
                          image: member.image || "",
                        }}
                        className="h-8 w-8"
                      />
                      {member.name}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <RoleModal
                        key={member.id}
                        member={member}
                        workspaceId={workspace.id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Button
        disabled={!workspaceForm.formState.isDirty || isSubmitting}
        variant="default"
        type="submit"
        form="workspaceSettingsForm"
        className="mt-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Update"
        )}
      </Button>
    </>
  )
}

export default WorkspaceSettingsForm
