"use client"

import React, { useEffect } from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"

type Props = {
  children: React.ReactNode
}

export default function WorkspaceProvider({ children }: Props) {
  const { workspace, setWorkspace } = useWorkspaceStore()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/workspaces")
      const { data } = await res.json()
      const workspace = data[0]

      setWorkspace(workspace)
    }

    if (workspace === null) {
      fetchData()
    }

    if (workspace !== null) {
      setLoading(false)
    }
  }, [workspace,setWorkspace])

  // if (loading) {
  //   return (
  //     <div className="grid h-[70dvh] place-items-center">
  //       <div className="flex flex-col items-center gap-2">
  //         <Loader className=" animate-spin" />
  //         <div>Please wait while we make everything perfect for you...</div>
  //       </div>
  //     </div>
  //   )
  // }
  return <div>{children}</div>
}
