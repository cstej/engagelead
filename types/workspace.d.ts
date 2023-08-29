
export type Member = {
    id: string
    email: string
    emailVerified: string | null
    name: string
    image: string | undefined
    role: string
  }
  
  export type WorkspaceWithMembers = {
    id: string
    name: string
    members: Member[]
  }