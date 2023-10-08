import React from "react"
import Link from "next/link"
import { DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { serverClient } from "@/lib/trpc/serverClient"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
}

export default async function LeadLayout({ children }: Props) {



  return (
    <div className="flex min-h-screen flex-col space-y-4">

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium sm:text-lg">Manage Lead</h3>
          <p className="hidden text-sm text-muted-foreground sm:inline-block ">
            Nurture potential customers with streamlined lead management.
          </p>
        </div>
        <div className="flex gap-4">
          <Button size={"sm"} variant={"outline"} className="sm:h-9 sm:px-4 sm:py-2">
            <DownloadIcon className="mr-2" /> Export
          </Button>

          <Link
            href={"/app/leads/add"}
          
            className={cn(buttonVariants({ variant: "default", size: "sm",  }), "sm:h-9 sm:px-4 sm:py-2")}
          >
            New Lead
          </Link>
        </div>
      </div>

      <Separator />
      {children}
    </div>
  )
}
