"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import format from "date-fns/format"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lead_status: string;
  lead_source: string;
  assigned_to: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Columns: ColumnDef<Lead, undefined>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
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
      <div className="capitalize">{row.getValue("assigned_to")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
