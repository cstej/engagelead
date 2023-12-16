"use client"

import React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {}

function DeleteAccount({}: Props) {
  const onSubmit = () => {}
  return (
    <Card className="relative overflow-hidden shadow-none">
      <CardHeader className=" border-b">
        <CardTitle className="mb-2 text-destructive">Danger zone</CardTitle>
        <CardDescription className="hidden md:block">
          Once you delete your account, there is no going back. Please be
          certain.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end overflow-hidden  border-t bg-primary-foreground p-3">
        <Button
          onClick={onSubmit}
          prefix={<Trash2 className="h-4 w-4" />}
          variant={"destructive"}
          className="font-medium"
        >
          Delete my account
        </Button>
        
      </CardFooter>
    </Card>
  )
}

export default DeleteAccount
