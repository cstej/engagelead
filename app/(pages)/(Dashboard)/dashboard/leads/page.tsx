import React from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

type Props = {}

export const dynamic = "force-dynamic"

 async function getLeads() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }


    const data = await res.json()
    return data?.data
}

export default async function LeadPage({}: Props) {
  const data = await getLeads()
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

      <DataTable data={data || []} columns={Columns} />
    </div>
  )
}
