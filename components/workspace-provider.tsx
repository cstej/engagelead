"use client"

import React, { useEffect } from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"

type Props = {
  children: React.ReactNode
}

export default function WorkspaceProvider({ children }: Props) {
  const { setWorkspace } = useWorkspaceStore()
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch("/api/workspaces")
      const { data } = await res.json()

      useWorkspaceStore.setState({ workspace: data.workspace })
    }

    fetchdata()
  }, [])

  const { workspace } = useWorkspaceStore();

  if (workspace === null) {
    return   <div className="flex h-screen items-center justify-center">
    <div className="h-14 w-14 animate-spin rounded-full border-t-4 border-blue-500"></div>
  </div>;
  }
  return <div>{children}</div>
}
