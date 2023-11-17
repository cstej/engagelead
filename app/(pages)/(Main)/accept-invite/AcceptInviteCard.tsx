"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

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
      toast.error("There was a problem with your request.", {
        description: result.error,
      })
    } else {
      toast.success("Invitation accepted")
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
