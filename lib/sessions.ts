import { cookies } from "next/headers"
import { getServerSession } from "next-auth"

import { authOptions } from "./auth"

export function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function getCurrentWorkspace() {
  const Cookies = cookies()

  const workspace = Cookies.get("workspace")?.value


  if (workspace) {
    return JSON.parse(workspace)
  } else {
    return null
  }
}
