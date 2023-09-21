import React from "react"

import { getCurrentUserAndWorkspace, getCurrentWorkspace } from "@/lib/sessions"
import { Separator } from "@/components/ui/separator"

import { getWorkspaceWithMemebers } from "../loaders"
import WorkspaceSettingForm from "./_components/WorkspaceSettingForm"

type Props = {}

export default async function WorkspaceSetting({}: Props) {
  const uw = await getCurrentUserAndWorkspace()

  if (!uw) {
    return null
  }

  const workspaceWithMember = await getWorkspaceWithMemebers(uw?.workspaceId)
  return (
    <div className=" mx-auto space-y-6  lg:min-w-[896px]">
      <div>
        <h3 className="text-xl font-medium">Workspace</h3>
        <p className="text-sm text-muted-foreground">
          Customize and manage your team&apos;s workspace effortlessly.
        </p>
      </div>
      <Separator />

      <WorkspaceSettingForm workspace={workspaceWithMember} />
    </div>
  )
}
