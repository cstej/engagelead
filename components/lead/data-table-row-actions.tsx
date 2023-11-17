"use client"

import React from "react"
import { Lead } from "@/server/schema/lead.schema"
import { useWorkspaceMembersStore } from "@/store/client"
import { CheckIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/exceptions/errors"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { assignLeadToUser } from "../../app/(pages)/(Main)/app/leads/actions"
import { api } from "../providers/trpc-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const lead = row.original as Lead

  const { data: members } = api.workspace.getMembers.useQuery(undefined, {
    staleTime: 600000,
  })

  const [open, setOpen] = React.useState(false)

  async function handleAssignToChange(value: string) {
    try {
      await assignLeadToUser(lead.id, value)

      toast.success("Lead assigned successfully")
    } catch (error) {
      toast.error("There was a problem with your request.", {
        description: getErrorMessage(error),
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Assign to</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="p-0">
            <Command defaultValue={lead.assignedTo._id}>
              <CommandInput
                placeholder="Search members..."
                autoFocus={true}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No Member found.</CommandEmpty>
                <CommandGroup>
                  {members?.map((member) => (
                    <CommandItem
                      key={member.id}
                      value={member.id}
                      onSelect={handleAssignToChange}
                    >
                      {member.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          member.id === lead.assignedTo._id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
