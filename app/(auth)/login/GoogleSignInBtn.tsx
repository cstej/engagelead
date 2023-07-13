"use client"

import React from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

type Props = {}

const GoogleSignInBtn = (props: Props) => {
  return (
    <Button onClick={() => signIn("google")} variant="outline">
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  )
}

export default GoogleSignInBtn
