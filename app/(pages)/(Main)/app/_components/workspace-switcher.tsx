"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
import { api } from "@/components/providers/trpc-react"

type Workspaces = [
  {
    id: string
    name: string
  },
]

export function WorkspaceSwitcher() {
  const { refresh } = useRouter()

  const {
    isLoading,
    isError,
    data: workspaces,
  } = api.workspace.getUserWorkspaces.useQuery(undefined, {
    staleTime: 10000,
    cacheTime: 10000,
  })

  const queryClient = useQueryClient()
  const { mutate } = api.workspace.switchWorkspace.useMutation({
    onSuccess: () => {
     refresh()

      queryClient.clear()
    },
  })

  const [open, setOpen] = React.useState(false)

  if (isLoading) {
    return <Skeleton className="h-8 w-[100px] rounded-full" />
  }

  if (isError) {
    return <div className="h-9 ">Something went wrong</div>
  }

  const handleWorkspaceChange = async (workspace: {
    id: string
    name: string
  }) => {
    mutate(workspace)
  }

  const cookieValue = Cookies.get("workspace")

  type CookieType = {
    id: string
    name: string
  }

  const cookie = cookieValue && (JSON.parse(cookieValue) as CookieType)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Badge
            variant={"secondary"}
            className="h-8 cursor-pointer rounded-full"
          >
            <span className="truncate">
              {cookie
                ? workspaces?.find((workspace) => workspace?.id === cookie.id)
                    ?.name
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
                  setOpen(false)
                  // @ts-ignore
                  handleWorkspaceChange(workspaces[i])
                }}
              >
                <span className="truncate">{workspace.name}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    cookie && cookie.id === workspace?.id
                      ? "opacity-100"
                      : "opacity-0"
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
