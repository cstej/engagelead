"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import { AcceptInvitation } from "./action"

type Props = {}

export default function AcceptInviteCard({}: Props) {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const result = await AcceptInvitation(token as string)

    if (result?.error) {
      toast({
        title: result.error,
        description: "There was a problem with your request.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Invitation accepted",
        description: "Invitation accepted successfully.",
        variant: "default",
      })
      router.push("/app/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accepting...
          </>
        ) : (
          "Accept Invite"
        )}
      </Button>
    </form>
  )
}
