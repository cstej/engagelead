"use client"

import React from "react"
import { signOut } from "next-auth/react"

import { Button } from "../ui/button"

type Props = {}

export const SignoutBtn = (props: Props) => {
  return <Button onClick={() => signOut()}>Signout</Button>
}
