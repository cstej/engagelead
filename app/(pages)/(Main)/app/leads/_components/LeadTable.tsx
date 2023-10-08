"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Lead } from "@/types/lead"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableRowActions } from "@/app/(pages)/(Main)/app/leads/_components/DataTableRowActions"

import LeadDrawer from "./LeadDrawer"

type Props = {
  data: Lead[]
  pageCount: number
}

export const leadSource = [
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Referral",
    value: "referral",
  },
  {
    label: "Email Campaign",
    value: "email campaign",
  },
  {
    label: "Social Media",
    value: "social media",
  },
]

export const leadStatus = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Contacted",
    value: "contacted",
  },
  {
    label: "Qualified",
    value: "qualified",
  },
]

export default function LeadTable({ data, pageCount }: Props) {
  const [isPending, startTransition] = React.useTransition()
  const columns = React.useMemo<ColumnDef<Lead, undefined>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
          <div className="capitalize">
            {format(new Date(row.getValue("createdAt")), "dd-MM-yyyy")}
          </div>
        ),
      },

      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="capitalize">
            <LeadDrawer key={row.original.id} lead={row.original}>
              <Badge variant={"default"} >{row.getValue("name")}</Badge>{" "}
            </LeadDrawer>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("phone")}</div>
        ),
      },
      {
        accessorKey: "lead_source",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Lead Source" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <div className="capitalize">{row.getValue("lead_source")}</div>
          </div>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "lead_status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Lead Status" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <div className="capitalize">{row.getValue("lead_status")}</div>
          </div>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "assigned_to",
        header: ({ column }) => (
          <div className="flex items-center">
            <DataTableColumnHeader column={column} title="Assigned To" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.original.assigned_to.name}</div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
      },
    ],
    []
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "lead_source",
          title: "Lead Source",
          options: leadSource.map((source) => ({
            label: source.label,
            value: source.value,
          })),
        },
        {
          id: "lead_status",
          title: "Lead Status",
          options: leadStatus.map((status) => ({
            label: status.label,
            value: status.value,
          })),
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "Name",
        },
      ]}
    />
  )
}
