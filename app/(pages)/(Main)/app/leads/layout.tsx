import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { serverClient } from "@/lib/trpc/serverClient"

type Props = {
  children: React.ReactNode
}

export default async function LeadLayout({ children }: Props) {


  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium">Manage Lead</h3>
          <p className="text-sm text-muted-foreground">
            Nurture potential customers with streamlined lead management.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant={"outline"}>
            <DownloadIcon className="mr-2" /> Export
          </Button>

          <Link
            href={"/app/leads/add"}
            className={buttonVariants({ variant: "default" })}
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
