import React from "react"

import { getCurrentWorkspace } from "@/lib/sessions"
import { Separator } from "@/components/ui/separator"

import { getWorkspaceWithMemebers } from "../loaders"
import WorkspaceSettingForm from "./_components/WorkspaceSettingForm"



type Props = {}

export default async function WorkspaceSetting({}: Props) {
  const workspace = await getCurrentWorkspace()

  const workspaceWithMember = (await getWorkspaceWithMemebers(
    workspace.id
  ))
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
