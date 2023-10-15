import { Prisma, Role, User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: React.node
  href?: string
  }

  

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}



export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
  sidebarNavMobile: SidebarNavItem[]
}


//  for data table

export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}


export type UserAndWorkspace = {
  userId: string;
  userName: string;
  emailVerified: Date;
  email: string;
  workspaceId: string;
  role: string;
  workspaceName: string;
}


export type Ctx ={
  userId: string;
  userName: string | null | undefined;
  emailVerified: Date | null;
  email: string | null | undefined;
  workspaceId: string;
  role: Role;
  workspaceName: string | null;
  req: Request;
  resHeaders: Headers;
}

