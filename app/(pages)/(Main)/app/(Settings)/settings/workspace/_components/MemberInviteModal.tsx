import React from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Role } from "@prisma/client"
import { Loader2, UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

import { inviteMember } from "../../actions"

type Props = {}

export default function MemberInviteModal({}: Props) {
  const [showDialog, setShowDialog] = React.useState(false)

  const { workspace } = useWorkspaceStore()

  const inviteMemberFormSchema = z.object({
    email: z.string().email(),
    role: z.enum([Role.ADMIN, Role.SALES_AGENT, Role.MANAGER]),
  })

  const inviteMemberForm = useForm({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      email: "",
      role: Role.SALES_AGENT,
    },
  })

  const handleInviteMemberSubmit = async (
    value: z.infer<typeof inviteMemberFormSchema>
  ) => {
    const result = await inviteMember({ ...value, workspaceId:  workspace?.id ?? ""})

    if (result?.error) {
      toast({
        title: result.error,
        description: "There was a problem with your request.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Invitation sent",
        description: "Invitation sent successfully to " + value.email + ".",
        variant: "default",
      })
      setShowDialog(false)
    }
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite workspace members</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="invite-individual">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invite-individual">
                Invite individual
              </TabsTrigger>
              <TabsTrigger value="bulk-import">Bulk import</TabsTrigger>
            </TabsList>
            <TabsContent value="invite-individual">
              <Form {...inviteMemberForm}>
                <form
                  id="inviteMemberForm"
                  onSubmit={inviteMemberForm.handleSubmit(
                    handleInviteMemberSubmit
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={inviteMemberForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={inviteMemberForm.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={inviteMemberForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Invite as</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem key={Role.ADMIN} value={Role.ADMIN}>
                                  Admin
                                </SelectItem>
                                <SelectItem
                                  key={Role.MANAGER}
                                  value={Role.MANAGER}
                                >
                                  Manager
                                </SelectItem>
                                <SelectItem
                                  key={Role.SALES_AGENT}
                                  value={Role.SALES_AGENT}
                                >
                                  Sales Agent
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="bulk-import">
              <div className="grid gap-4 py-4">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-16 w-16 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1.5-5a1.5 1.5 0 113 0v1.5a.5.5 0 01-1 0V11a.5.5 0 00-.5-.5h-1a.5.5 0 010-1h.5zm0-3a1.5 1.5 0 110 3h-.5a.5.5 0 010-1h1a.5.5 0 00.5-.5V7.5a.5.5 0 01.5-.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-lg font-medium">Bulk import members</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Coming soon! You will be able to bulk import members using a
                    CSV file.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Separator />
        <DialogFooter>
          <Button
            type="submit"
            form="inviteMemberForm"
            key={"inviteMemberForm"}
          >
            {inviteMemberForm.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending..
              </>
            ) : (
              " Send Invite"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
