"use client"

import * as React from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Workspaces = [
  {
    id: string
    name: string
  },
]

export function WorkspaceSwitcher() {
  const { workspace, setWorkspace } = useWorkspaceStore()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(workspace?.id)

  const { data: workspaces, isLoading, error } = useQuery<Workspaces>(
    ["workspaces"],
    async () => {
      const res = await fetch("/api/workspaces");
      if (!res.ok) {
        throw new Error("Failed to fetch workspaces");
      }
      const data = await res.json() as { data: Workspaces | null };
      if (data.data === null) {
        throw new Error("Failed to fetch workspaces");
      }
      return data.data;
    }
  );

  if (isLoading) {
    return <Skeleton className="h-9 w-[200px]" />
  }

  if (error) {
    return <div className="h-9 w-[200px]">Something went wrong</div>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between "
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="truncate">
            {value
              ? workspaces?.find((workspace) => workspace?.id === value)?.name
              : "Select Workspace..."}
          </span>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Workspace..." className="h-9" />
          <CommandEmpty>No Workspace found.</CommandEmpty>
          <CommandGroup>
            {workspaces?.map((workspace, i) => (
              <CommandItem
                key={workspace?.id}
                value={workspace?.id}
                onSelect={(currentValue) => {
                  setValue(currentValue)
                  setOpen(false)
                  setWorkspace(workspaces[i])

                  window.location.reload()
                }}
              >
                <span className="truncate">{workspace.name}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === workspace?.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
