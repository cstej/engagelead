"use client"
import React from "react"
import { dashboardConfig } from "@/config/dashboard"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const Setting = () => {
  const items = dashboardConfig.settingNav
 const path = usePathname()

  return (
    <div>
      {/* <ul className="flex flex-col gap-1 pr-4">
        {items.map((item, index) => {
          return (
            item.href && (
              <li key={index}>
                <Link href={item.disabled ? "/" : item.href}>
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
                      {path === item.href && (
                        <ChevronRight className="h-4 w-4 text-accent-foreground" />
                      )}
                    </div>
                  </span>
                </Link>
              </li>
            )
          )
        })}
      </ul> */}
    </div>
  )
}

export default Setting
