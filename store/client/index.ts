// Users store

import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type Member = {
  id: string
  name: string
  email: string
  image: string
}

interface WorkspaceMembersStore {
  members: Member[]
  loading: boolean
  setMembers: (members: Member[]) => void
}

const useWorkspaceMembersStore = create<WorkspaceMembersStore>()(
  devtools((set, get) => ({
    members: [],
    loading: true,
    setMembers: (member) =>
      set((state) => {
        const newState = { ...state, members: [...member], loading: false }
        return newState
      }),
  }))
)

const fetchMembers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workspaces/users`)
  const data = (await response.json()) as Member[]
  useWorkspaceMembersStore.getState().setMembers(data)
}

fetchMembers()

export { useWorkspaceMembersStore }
