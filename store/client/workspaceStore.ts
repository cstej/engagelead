import Cookies from "js-cookie"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type Workspace = {
  id: string
  name: string
}

interface WorkspaceStore {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace) => void
}

const useWorkspaceStore = create<WorkspaceStore>()(
  devtools((set, get) => ({
    workspace: (() => {
      const workspaceCookie = Cookies.get("workspace");
      if (workspaceCookie) {
        try {
          return JSON.parse(workspaceCookie) as Workspace;
        } catch (error) {
          console.error("Error parsing workspace cookie:", error);
        }
      }
      return null;
    })(),
    setWorkspace: (workspace) =>
      set((state) => {
        // Update the state
        const newState = { ...state, workspace: { ...workspace } }

        // Serialize the state to JSON
        const newStateJSON = JSON.stringify(newState.workspace)

        if (newStateJSON === "{}" || newStateJSON === "null" || !newStateJSON) {
          Cookies.remove("workspace")
          return newState
        }
        Cookies.set("workspace", newStateJSON)
        return newState
      }),
  }))
)

export default useWorkspaceStore
