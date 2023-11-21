"use client"

import React, { useEffect } from "react"

import ManageWorkspaceMembers from "@/components/settings/workspace/form/manage-workspace-members"

const Page = () => {
  return (
    <div className="my-6 flex flex-col gap-4 px-4">
      <ManageWorkspaceMembers />
    </div>
  )
}

export default Page
