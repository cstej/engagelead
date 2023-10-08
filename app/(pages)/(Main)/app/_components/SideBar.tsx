"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, BellRing, ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

import { UserAccountNav } from "./user-account-nav"
import { WorkspaceSwitcher } from "./workspace-switcher"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function SideBar({ items }: DashboardNavProps) {
  const path = usePathname()

  const { data } = useSession()

  if (!data?.user) {
    return null
  }

  return (
    <nav className="fixed   w-[226px]  overflow-y-auto  py-6">
      <div className="relative flex h-[95vh] flex-col ">
        <div className="flex items-center justify-between pl-2">
          <WorkspaceSwitcher />
          {/* @ts-ignore */}

          <div className="rounded-full border p-2">
            <Bell className="h-4 w-4 " />
          </div>
        </div>
        <Separator className="my-4" />

        <div className="flex flex-col gap-1">
          {items.map((item, index) => {
            return (
              item.href && (
                <Link key={index} href={item.disabled ? "/" : item.href}>
                  <span
                    className={cn(
                      "group flex items-center justify-between rounded-r-md px-3 py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80 "
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {React.cloneElement(item.icon, {
                        className: cn("h-4 w-4 text-foreground "),
                      })}
                      <span>{item.title}</span>
                    </div>

                    <div className="order-last">
                      {" "}
                      {path === item.href && (
                        <ChevronRight className="h-4 w-4 text-accent-foreground" />
                      )}
                    </div>
                  </span>
                </Link>
              )
            )
          })}
        </div>

        <div className="absolute bottom-[10px] left-[50%] translate-x-[-50%]">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
