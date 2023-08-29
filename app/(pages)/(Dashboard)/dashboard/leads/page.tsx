import React from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

type Props = {}


async function getLeads() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: { Cookie: cookies().toString() },
  })

  return response.json()
}

export default async function LeadPage({}: Props) {
  const { data } = await getLeads()


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
