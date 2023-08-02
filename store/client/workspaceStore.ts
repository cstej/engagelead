import { create } from "zustand"

type Workspace = {
  id: string
  name: string
}

interface WorkspaceStore {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
}

const useWorkspaceStore = create<WorkspaceStore>()((set, get) => ({
  workspace: null,
  setWorkspace: (workspace) =>
    set((state) => ({ ...state, workspace: { ...workspace } })),
}))

export default useWorkspaceStore
