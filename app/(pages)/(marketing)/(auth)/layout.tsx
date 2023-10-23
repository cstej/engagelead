import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}
const AuthLayout = (props: Props) => {
  return <>{props.children}</>
}

export default AuthLayout
