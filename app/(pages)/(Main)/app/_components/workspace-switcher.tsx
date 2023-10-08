"use client"

import * as React from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

  const {
    data: workspaces,
    isLoading,
    error,
  } = useQuery<Workspaces>(["workspaces"], async () => {
    const res = await fetch("/api/workspaces")
    if (!res.ok) {
      throw new Error("Failed to fetch workspaces")
    }
    const data = (await res.json()) as { data: Workspaces | null }
    if (data.data === null) {
      throw new Error("Failed to fetch workspaces")
    }
    return data.data
  })

  if (isLoading) {
    return <Skeleton className="h-8 w-[100px] rounded-full" />
  }

  if (error) {
    return <div className="h-9 ">Something went wrong</div>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Badge
            variant={"secondary"}
            className="h-8 cursor-pointer rounded-full"
          >
            <span className="truncate">
              {value
                ? workspaces?.find((workspace) => workspace?.id === value)?.name
                : "Select Workspace..."}
            </span>
          </Badge>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 cursor-pointer " />
        </div>
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
