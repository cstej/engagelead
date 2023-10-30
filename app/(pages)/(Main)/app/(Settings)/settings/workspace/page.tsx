import React from "react"

import EditWorkspaceProfile from "@/components/settings/workspace/form/edit-workspace-profile"
import DeleteWorkspace from "@/components/settings/workspace/form/delete-workspace"

type Props = {}

export default async function WorkspaceSetting({}: Props) {
  return (
    <div className="my-6 flex flex-col gap-4 px-4">
      <EditWorkspaceProfile />
      {/* Danger Zone | Delete Workspace */}
      <DeleteWorkspace/>
    </div>
  )
}
