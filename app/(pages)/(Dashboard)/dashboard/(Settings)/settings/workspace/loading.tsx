import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className=" mx-auto space-y-6  lg:min-w-[896px]">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      <Separator />
      <Skeleton className="h-6 w-[100%]" />
      <Skeleton className="h-6 w-[100]" />
    </div>
  )
}
