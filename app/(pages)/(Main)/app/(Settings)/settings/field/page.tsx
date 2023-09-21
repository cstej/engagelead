import React from "react"
import { Baseline, Calendar, Hash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getAllFieldDefinitions } from "./loaders"
import ManageField from "./ManageField"
import NumberFieldModal from "./NumberFieldModal"
import TextFieldModal from "./TextFieldModal"

type Props = {}

async function FieldSetting({}: Props) {
  const fieldDefinations = await getAllFieldDefinitions()

  return (
    <div className=" mx-auto space-y-6  lg:min-w-[896px]">
      <div>
        <h3 className="text-xl font-medium">Field</h3>
        <p className="text-sm text-muted-foreground">
          Customize and manage your Lead Fields.
        </p>
      </div>
      <Separator />
      <div>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
          <TextFieldModal key={"textfieldmodal"} />
          <NumberFieldModal key={"numberfieldmodal"} />
          <div className="flex h-12 items-center  justify-center border ">
            <Calendar className="mr-2" /> Date
          </div>
        </div>

        <Card className=" mt-10 shadow-none">
          <CardHeader>
            <CardTitle>Manage custom field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field name</TableHead>
                    <TableHead>Field type</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldDefinations?.map((fieldDefination) => (
                    <TableRow key={fieldDefination.id}>
                      <TableCell className="flex items-center gap-2">
                        {fieldDefination.label}
                      </TableCell>
                      <TableCell className="">
                        <Badge variant={"outline"}>
                          {fieldDefination.type === "Text" && (
                            <Baseline className="mr-2 h-4 w-4" />
                          )}
                          {fieldDefination.type === "Number" && (
                            <Hash className="mr-2 h-4 w-4" />
                          )}
                          {fieldDefination.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ManageField
                          key={fieldDefination.id}
                          fieldDefinition={fieldDefination}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FieldSetting
