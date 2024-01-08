import React from "react"

import { Skeleton } from "../ui/skeleton"

type Props = {
  length?: number
}

const FormLoadingSkeleton = (props: Props) => {
  return (
    <div className="p-6">
      {Array.from({ length: props.length || 3 }).map((_, i) => (
        <Skeleton key={i} className="my-4 h-8 space-y-4" />
      ))}
    </div>
  )
}

export default FormLoadingSkeleton
