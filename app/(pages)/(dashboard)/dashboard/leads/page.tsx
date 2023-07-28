
import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"

import { Columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { cookies } from "next/headers";

type Props = {}

async function getLeads() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: { Cookie: cookies().toString() }
  })

  return response.json()
}

export default async function LeadPage({}: Props) {

const data = await getLeads()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-between">
        <p className="pb-8 text-2xl font-semibold tracking-wide">
          {data.length} Leads
        </p>
        <div className="flex gap-4">
          <Button variant={"outline"}>
            {" "}
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

      <DataTable data={data.data} columns={Columns} />
    </div>
  )
}
