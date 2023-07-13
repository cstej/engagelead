
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
  const leads = [
    {
      id: "1",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      lead_source: "website",
      lead_status: "new",
      assigned_to: "Alice",
      created_at: "2023-07-07T12:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      lead_source: "referral",
      lead_status: "contacted",
      assigned_to: "Bob",
      created_at: "2023-07-07T12:01:00Z",
    },
    {
      id: "3",
      name: "Mark Johnson",
      email: "markjohnson@example.com",
      phone: "555-123-4567",
      lead_source: "email campaign",
      lead_status: "qualified",
      assigned_to: "Alice",
      created_at: "2023-07-07T12:02:00Z",
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emilybrown@example.com",
      phone: "222-333-4444",
      lead_source: "social media",
      lead_status: "new",
      assigned_to: "Bob",
      created_at: "2023-07-07T12:03:00Z",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      phone: "777-888-9999",
      lead_source: "website",
      lead_status: "contacted",
      assigned_to: "Alice",
      created_at: "2023-07-07T12:04:00Z",
    },
    {
      id: "6",
      name: "Sarah Thompson",
      email: "sarahthompson@example.com",
      phone: "111-222-3333",
      lead_source: "referral",
      lead_status: "qualified",
      assigned_to: "Bob",
      created_at: "2023-07-07T12:05:00Z",
    },
    {
      id: "7",
      name: "David Lee",
      email: "davidlee@example.com",
      phone: "444-555-6666",
      lead_source: "email campaign",
      lead_status: "new",
      assigned_to: "Alice",
      created_at: "2023-07-07T12:06:00Z",
    },
    {
      id: "8",
      name: "Jennifer Clark",
      email: "jenniferclark@example.com",
      phone: "888-999-0000",
      lead_source: "social media",
      lead_status: "contacted",
      assigned_to: "Bob",
      created_at: "2023-07-07T12:07:00Z",
    },
    {
      id: "9",
      name: "James Taylor",
      email: "jamestaylor@example.com",
      phone: "333-444-5555",
      lead_source: "website",
      lead_status: "qualified",
      assigned_to: "Alice",
      created_at: "2023-07-07T12:08:00Z",
    },
    {
      id: "10",
      name: "Stephanie Wright",
      email: "stephaniewright@example.com",
      phone: "666-777-8888",
      lead_source: "referral",
      lead_status: "new",
      assigned_to: "Bob",
      created_at: "2023-07-07T12:09:00Z",
    },
  ]

const data = await getLeads()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-between">
        <p className="pb-8 text-2xl font-semibold tracking-wide">
          {leads.length} Leads
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
