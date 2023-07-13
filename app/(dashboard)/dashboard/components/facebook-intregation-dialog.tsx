"use client"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import FacebookFormSelect from "./facebook-form-select"
import FacebookLoginBtn from "./facebook-login-btn"
import FacebookPageSelect from "./facebook-page-select"
import { useState } from "react"

export function FacebookIntregationDialog() {
  const [user, setUser] = useState({})
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect</Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Facebook</DialogTitle>
          <DialogDescription>
            Automatically capture your facebook leads Ads.
          </DialogDescription>
        </DialogHeader>
        <div className=" grid gap-4 py-4">
          <Button variant={"outline"}>
            <Icons.facebook className="mr-2 h-4 w-4" />
            Login in with Facebook{" "}
          </Button>

          <FacebookPageSelect />
          <FacebookFormSelect />
          <FacebookLoginBtn
            appId="633526608711641"
            onSuccess={(response) => {

              console.log("Login Success!", response)
              setUser(response)
            }}
            onFail={(error) => {
              console.log("Login Failed!", error)
            }}
            onProfileSuccess={(response) => {
              console.log("Get Profile Success!", response)
            }}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.facebook className="mr-2 h-4 w-4" />
            Login in with Facebook{" "}
          </FacebookLoginBtn>
        </div>

        
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
