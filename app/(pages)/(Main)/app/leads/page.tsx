import React from "react"
import Link from "next/link"

import LeadTable from "./_components/LeadTable"
import { getLeads } from "./loaders"

type Props = {}

export const revalidate = 0

export default async function LeadPage({}: Props) {
  const result = await getLeads()

  const data = result?.data || []

  return <LeadTable data={data} pageCount={1} />
}
