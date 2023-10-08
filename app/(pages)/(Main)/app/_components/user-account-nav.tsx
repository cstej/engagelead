"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"
import Cookies from "js-cookie"
import { Separator } from "@/components/ui/separator"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name?: string
    image?: string
    email?: string
  }
}

export function UserAccountNav({ user }: UserAccountNavProps) {

  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/`,
    },
    )
    Cookies.remove("workspace")
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || "", image: user?.image || undefined }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 rounded-md  border-transparent bg-secondary p-2 text-secondary-foreground hover:bg-secondary/80">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="text-sm font-semibold ">{user?.name}</p>}
          <Separator className="my-2"/>
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
