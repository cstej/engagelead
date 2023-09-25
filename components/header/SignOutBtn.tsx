"use client"

import React from "react"
import { signOut } from "next-auth/react"

import { Button } from "../ui/button"
import Cookies from "js-cookie"

type Props = {}

export const SignoutBtn = (props: Props) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/`,
    },
    )
    Cookies.remove("workspace")
  }
  return <Button onClick={handleSignOut}>Signout</Button>
}
