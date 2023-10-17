"use client"

import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import LeadTable from "@/components/lead/lead-table"
import { api } from "@/components/providers/trpc-react"

import PageHeader from "../_components/PageHeader"

type Props = {}

export default function LeadPage({}: Props) {
  const { isLoading, data: leads } = api.lead.getAllLeads.useQuery(undefined, {
    staleTime: 10000,
    cacheTime: 10000,
  })

  return (
    <>
      <PageHeader
      key={"lead"}
        title="Manage Lead"
        description=" Nurture potential customers with streamlined lead management."
        buttons={[
          <Button
            size={"sm"}
            variant={"outline"}
            className="sm:h-9 sm:px-4 sm:py-2"
          >
            <DownloadIcon className="mr-2" /> Export
          </Button>,
          <Link
            href={"/app/leads/add"}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "sm:h-9 sm:px-4 sm:py-2"
            )}
          >
            New Lead
          </Link>,
        ]}
      />

      <div className="px-2 md:px-5 ">
        <LeadTable isLoading={isLoading} data={leads ?? []} pageCount={1} />
      </div>
    </>
  )
}
