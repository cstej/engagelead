import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

import { Columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { getLeads } from "./loaders"

type Props = {}

export const revalidate = 0 

export default async function LeadPage({}: Props) {
  const result = await getLeads()

  if (result.message) {
    toast({
      title: "Something went wrong",
      description: result.message,
    })
  }

  const data = result?.data || []

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
            href={"/dashboard/leads/add-lead"}
            className={buttonVariants({ variant: "default" })}
          >
            New Lead
          </Link>
        </div>
      </div>

      <Separator />

      <DataTable data={data} columns={Columns} />
    </div>
  )
}
