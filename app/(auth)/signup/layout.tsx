import React, { ReactNode } from "react"
import { Metadata } from "next"

type Props = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: "Signup",
  description: "Create an account to get started.",
}

const layout = (props: Props) => {
  return <div className="min-h-screen">{props.children}</div>
}

export default layout
