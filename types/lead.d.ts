export type Lead = {
  id: string
  name: string
  email: string
  phone: string
  lead_status: string
  lead_source: string
  assigned_to: {
    _id: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}
