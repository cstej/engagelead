import { Separator } from "@/components/ui/separator"
import React from "react"

type Props = {
  title: string
  description?: string
  buttons?: React.ReactNode[]
}
import { Skeleton } from "@/components/ui/skeleton"

function PageHeader({ title, description, buttons }: Props) {
  return (
    <>
     <header className="flex items-center justify-between px-2  pt-2 md:px-5 md:pt-5" >
      <div>
        <h3 className="text-base font-medium sm:text-lg">{title}</h3>
        <p className="hidden text-sm text-muted-foreground sm:inline-block ">
          {description}
        </p>
      </div>
      <div className="flex gap-4">{buttons?.map((button) => button)}</div>
    </header>
     <Separator />
    </>
   
  )
}



export default PageHeader
