import React from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserAvatar } from "@/app/(pages)/(Main)/app/_components/user-avatar"

const ManageWorkspaceMembers = () => {
  // @ts-ignore
  const workspaceMembers = [
    {
        id: "1",
        name: "tej",
        email: "cstej@gmail.com",
        image:"",
        role: "admin",

    }
  ]

  return (
    <Card className="relative overflow-hidden shadow-none">
      <CardHeader className=" border-b">
        <CardTitle>Manage Team</CardTitle>
        <CardDescription className="hidden md:block">
          Manage your team and their respective roles within the workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="my-4 space-y-4">
        <form>
          <Input prefix={<Search className="h-4 w-4" />} placeholder="Search" />
        </form>

        {/* Members Table */}
        {/* <div className="overflow-hidden rounded-md border"> */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader >
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaceMembers?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-2">
                    <UserAvatar
                      user={{
                        name: member.name,
                        image: member.image || "",
                      }}
                      className="h-8 w-8"
                    />
                    {member.name}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{member.role}</Badge>
                  </TableCell>
                  <TableCell>{/* workspace members action modal*/}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* </div> */}
       
      </CardContent>
    </Card>
  )
}

export default ManageWorkspaceMembers
