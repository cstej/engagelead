"use client"

import React from "react"
import { Role } from "@prisma/client"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import { Badge } from "@/components/ui/badge"
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
import { api } from "@/components/providers/trpc-react"

type Props = {
  member: z.infer<typeof memberSchema>
}

export default function MemberAction({ member }: Props) {
  const [showUpdateRoleDialog, setUpdateRoleDialog] = React.useState(false)
  const [deleteAlert, setDeleteAlert] = React.useState(false)

  const { data: session } = useSession()

  // Delete Alert Diolog
  const DeleteDialog = () => {
    async function onHandleSubmit(member: z.infer<typeof memberSchema>) {
      try {
        toast.success("Member Removed", {
          description: `${member.name} has been removed from workspace.`,
        })
        setDeleteAlert(false)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <AlertDialog
        key={member.memberId}
        open={deleteAlert}
        onOpenChange={setDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              {member.name} from workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onHandleSubmit(member)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // Dropdown Menu
  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {/* Edit */}

            <DropdownMenuItem onSelect={() => setUpdateRoleDialog(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>

            {/* Delete */}
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

      {/* Edit Role Diolog */}
      <UpdateRole
        member={member}
        setUpdateRoleDialog={setUpdateRoleDialog}
        showUpdateRoleDialog={showUpdateRoleDialog}
      />

      {/* delete Alert Diolog */}
      <DeleteDialog />
    </React.Fragment>
  )
}

// Update Role Diolog
const UpdateRole = ({
  member,
  showUpdateRoleDialog,
  setUpdateRoleDialog,
}: {
  member: z.infer<typeof memberSchema>
  showUpdateRoleDialog: boolean
  setUpdateRoleDialog: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const updateRoleFormSchema = z.object({
    role: memberSchema.shape.role,
    memberId: memberSchema.shape.memberId,
  })

  const form = useForm({
    defaultValues: {
      role: member.role,
      memberId: member.memberId,
    },
  })

  // Reset the form whenever the member data changes
  React.useEffect(() => {
    form.reset({
      role: member.role,
      memberId: member.memberId,
    })
  }, [member, form])

  //
  const utils = api.useUtils()
  const mutation = api.workspace.updateMemberRole.useMutation({
    onSuccess: () => {
      utils.workspace.getMembersWithRole.invalidate()
      setUpdateRoleDialog(false)
    },
  })
  async function onHandleSubmit(values: z.infer<typeof updateRoleFormSchema>) {
    mutation.mutate(values)
  }

  return (
    <Dialog open={showUpdateRoleDialog} onOpenChange={setUpdateRoleDialog}>
      <Form {...form}>
        <form id={member.memberId} onSubmit={form.handleSubmit(onHandleSubmit)}>
          <DialogContent className="p-0 sm:max-w-[425px]">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="tracking-wide">
                Change Member role
              </DialogTitle>
            </DialogHeader>

            <main className="grid gap-4 px-6 py-4">
              <div className="flex items-center gap-10 ">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold capitalize">
                      {member.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="truncate text-sm text-muted-foreground">
                      {member.email}
                    </span>
                    <span className="text-default mx-2 block">•</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {member.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <FormField
                name="role"
                control={form.control}
                defaultValue={member.role}
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
                          {Object.entries(Role).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </main>

            <DialogFooter className="gap-4 border-t p-4">
              <Button
                variant="outline"
                onClick={() => setUpdateRoleDialog(false)}
              >
                <span>Cancel</span>
              </Button>
              <Button
                form={member.memberId}
                disabled={mutation.isLoading || !form.formState.isDirty}
                isLoading={mutation.isLoading}
                loadingText="Saving"
                type="submit"
              >
                <span>Save</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
