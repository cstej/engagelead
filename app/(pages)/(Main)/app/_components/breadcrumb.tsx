import React from "react"

import { Icons } from "@/components/icons"

type Props = {
  root: String
  items?: String[]
}

const Breadcrumb = (props: Props) => {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="truncate">
        {props.root}
      </div>
      {props.items?.map((name) => {
        return (
          <>
            <Icons.chevronRight className="h-4 w-4" />
            <div className="font-medium text-foreground">{name}</div>
          </>
        )
      })}
    </div>
  )
}

export default Breadcrumb
