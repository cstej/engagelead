import Cookies from "js-cookie"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type Workspace = {
  id: string
  name: string
}

interface WorkspaceStore {
  workspace: Workspace 
  setWorkspace: (workspace: Workspace) => void
}

const useWorkspaceStore = create<WorkspaceStore>()(
  devtools((set, get) => ({
    workspace: Cookies.get("workspace") ? JSON.parse(Cookies.get("workspace") as string) : null,
    setWorkspace: (workspace) =>
      set((state) => {
        // Update the state
        const newState = { ...state, workspace: { ...workspace } }

        // Serialize the state to JSON
        const newStateJSON = JSON.stringify(newState.workspace)

        // Persist the JSON state in a cookie
        Cookies.set("workspace", newStateJSON)
        return newState
      }),
  }))
)

export default useWorkspaceStore
