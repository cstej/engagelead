export type Lead = {
    id: string
    name: string
    email: string
    phone: string
    leadStatus: string
    leadSource: string
    assignedTo: {
      _id: string
      name: string
    }
    createdAt: string
    updatedAt: string
    workspaceId: string
  }
  