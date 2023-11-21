"use client"

import React, { use, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Baseline, Delete, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

import { AddFieldDefination, DeleteFieldDefination, UpdateFieldDefination } from "./action"

type Props = {
  fieldDefinition: {
    id: string
    name: string
    type: string
    workspaceId: string
  }
}

const ManageField = ({ fieldDefinition }: Props) => {
  const [showEditFieldDialog, setShowEditFieldDialog] = React.useState(false)
  const [deleteAlert, setDeleteAlert] = React.useState(false)

  const formSchema = z.object({
    id: z.string(),
    fieldName: z.string().min(2).max(50),
    fieldType: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: fieldDefinition.id,
      fieldName: fieldDefinition.name,
      fieldType: fieldDefinition.type,
    },
  })

  useEffect(() => {
    form.reset({
      id: fieldDefinition.id,
      fieldName: fieldDefinition.name,
      fieldType: fieldDefinition.type,
    })
  }, [showEditFieldDialog, form, fieldDefinition])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      await UpdateFieldDefination(values)
      form.reset()
      setShowEditFieldDialog(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function onHandleDeleteDefination(id: string) {
    try {

        await DeleteFieldDefination(id)
     
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
            <DropdownMenuItem onSelect={() => setShowEditFieldDialog(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDeleteAlert(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete Alert Diolog */}

      <AlertDialog
        key={fieldDefinition.id}
        open={deleteAlert}
        onOpenChange={setDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{" "}
                {fieldDefinition.name} field.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=> onHandleDeleteDefination(fieldDefinition.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal According to the type */}

      <Dialog open={showEditFieldDialog} onOpenChange={setShowEditFieldDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
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
    </React.Fragment>
  )
}

export default ManageField
