"use client"

import { error } from "console"
import React, { useEffect } from "react"
import { Role } from "@prisma/client"
import { Loader2, MoreHorizontal, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { memberSchema } from "@/lib/zodSchemas"
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
import { toast } from "@/components/ui/use-toast"

import { updateMemberRole } from "../../actions"
import { Separator } from "@/components/ui/separator"

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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={showEditMemberDialog}
        onOpenChange={setShowEditMemberDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change team member role</DialogTitle>
          </DialogHeader>
          <Form {...updateRoleForm}>
            <form
              id="roleForm"
              onSubmit={updateRoleForm.handleSubmit(handleUpdateRoleSubmit)}
              className="grid gap-4 py-4"
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
                            <SelectItem key={Role.ADMIN} value={Role.ADMIN}>Admin</SelectItem>
                            <SelectItem key={Role.MANAGER}  value={Role.MANAGER}>
                              Manager
                            </SelectItem >
                            <SelectItem key={Role.SALES_AGENT} value={Role.SALES_AGENT}>
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
          <Separator/>
          <DialogFooter>
            <Button
              disabled={
                updateRoleForm.formState.isSubmitting ||
                !updateRoleForm.formState.isDirty
              }
              form="roleForm"
              type="submit"
            >
              {updateRoleForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving..{" "}
                </>
              ) : (
                " Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
