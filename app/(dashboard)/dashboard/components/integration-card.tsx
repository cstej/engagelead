import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Props = {
  title: string
  icon?: keyof typeof Icons
  description: string
  href: string,
  connect: ReactNode
}

export function IntegrationCard(props: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Icons.facebook className="mb-1 h-10 w-10" />
        <CardTitle>
          <p> {props.title} </p>
        </CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2">
      
       <Link
          href={props.href || "#"}
          rel="noreferrer"
          className={cn("flex-1",buttonVariants({variant: "outline"}))}
        >
          Details
        </Link>
         {props.connect}
      </CardFooter>
    </Card>
  )
}
