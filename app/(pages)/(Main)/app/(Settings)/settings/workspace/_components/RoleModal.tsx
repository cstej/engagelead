"use client"

import React, { useEffect } from "react"
import { Role } from "@prisma/client"
import { Loader2, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { memberSchema } from "@/lib/zodSchemas"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import Spinner from "@/components/spinner"

import { removeMemberWorkspace, updateMemberRole } from "../../actions"

type Props = {
  member: z.infer<typeof memberSchema>
  workspaceId: string
}

const updateRoleFormSchema = z.object({
  role: memberSchema.shape.role,
  id: memberSchema.shape.id,
  workspaceId: z.string(),
})

export function RoleModal({ member, workspaceId }: Props) {
  const [showEditMemberDialog, setShowEditMemberDialog] = React.useState(false)

  const { data: session } = useSession()

  const updateRoleForm = useForm({
    defaultValues: {
      role: member.role,
      id: member.id,
      workspaceId,
    },
  })

  useEffect(() => {
    updateRoleForm.reset({
      role: member.role,
      id: member.id,
      workspaceId,
    })
  }, [member, workspaceId, updateRoleForm])

  async function handleUpdateRoleSubmit(
    values: z.infer<typeof updateRoleFormSchema>
  ) {
    const result = await updateMemberRole(values)
    if (result?.error) {
      toast({
        title: result.error,
        description: "There was a problem with your request.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Role Updated",
        description: "Your role has been updated successfully.",
        variant: "default",
      })

      setShowEditMemberDialog(false)
    }
  }

  const [deleteAlert, setDeleteAlert] = React.useState(false)

  async function onHandleRemoveMemeber(id: string) {
    try {
      await removeMemberWorkspace(id)
      toast({
        title: "Member Removed",
        description: "Your member has been removed successfully.",
        variant: "default",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowEditMemberDialog(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={
                member.role === Role.ADMIN ||
                session?.user.email === member.email
              }
              onSelect={() => {
                setDeleteAlert(true)
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete Alert Diolog */}

      <AlertDialog
        key={member.id}
        open={deleteAlert}
        onOpenChange={setDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the{" "}
              {member.name} from workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onHandleRemoveMemeber(member.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={showEditMemberDialog}
        onOpenChange={setShowEditMemberDialog}
      >
        <DialogContent className="p-0 sm:max-w-[425px]">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Change team member role</DialogTitle>
          </DialogHeader>
          <Form {...updateRoleForm}>
            <form
              id="roleForm"
              onSubmit={updateRoleForm.handleSubmit(handleUpdateRoleSubmit)}
              className="grid gap-4 px-6 py-4"
            >
              <FormField
                name="role"
                control={updateRoleForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem key={Role.ADMIN} value={Role.ADMIN}>
                            Admin
                          </SelectItem>
                          <SelectItem key={Role.MANAGER} value={Role.MANAGER}>
                            Manager
                          </SelectItem>
                          <SelectItem
                            key={Role.SALES_AGENT}
                            value={Role.SALES_AGENT}
                          >
                            Sales Agent
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter className="border-t p-4">
            <Button
              disabled={
                updateRoleForm.formState.isSubmitting ||
                !updateRoleForm.formState.isDirty
              }
              isLoading={updateRoleForm.formState.isSubmitting}
              loadingText="Saving"
              form="roleForm"
              type="submit"
            >
              <span>Save</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
