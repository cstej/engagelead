import React from "react"

type Props = {
  children: React.ReactNode
}

export default async function LeadLayout({ children }: Props) {
  return <div className="flex min-h-screen flex-col space-y-4">{children}</div>
}
