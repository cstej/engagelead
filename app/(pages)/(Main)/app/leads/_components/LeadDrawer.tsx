import React from "react"
import { PersonIcon } from "@radix-ui/react-icons"
import { Mail, Phone, UserCircle } from "lucide-react"

import { Lead } from "@/types/lead"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  children: React.ReactNode
  lead: Lead
}

type Field = {
  id: string
  label: string
  icon: React.ReactNode
}

const leadField: Field[] = [
  {
    id: "name",
    label: "Name",
    icon: <UserCircle className="h-4 w-4" />,
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: "phone",
    label: "Phone",
    icon: <Phone className="h-4 w-4" />,
  },
]

const leadFieldValues = [
  {
    id: "name",
    value: "Tejendra Kumar",
  },
  {
    id: "email",
    value: "cstejendra@gmai.com",
  },
  {
    id: "phone",
    value: "1234567890",
  },
]

export default function LeadDrawer({ children, lead }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-full  sm:max-w-xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left">Manage Lead</SheetTitle>
        </SheetHeader>
        {/* Main content */}

        <Tabs defaultValue="lead_info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lead_info">Lead Detail</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="media">Photos & Docs</TabsTrigger>
          </TabsList>
          <TabsContent value="lead_info">
            <Card className="w-[530px]">
              <div className="mb-2  px-6 py-2 text-sm font-semibold">BASIC</div>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-4 text-muted-foreground">
                    {leadField.map((field) => (
                      <div className="flex items-center gap-2">
                        {field.icon}
                        <Label htmlFor="name">{field.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 ">
                    {leadFieldValues.map((field) => (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* We have to show custom Fields here  */}

              <div className="mb-2 border-t px-6 py-2 text-sm font-semibold">
                OTHER
              </div>
              <CardContent>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-4 text-muted-foreground">
                    {leadField.map((field) => (
                      <div className="flex items-center gap-2">
                        {field.icon}
                        <Label htmlFor="name">{field.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 ">
                    {leadFieldValues.map((field) => (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
