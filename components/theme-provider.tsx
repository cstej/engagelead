"use client"

import * as React from "react"
import useWorkspaceStore from "@/store/client/workspaceStore"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useSession } from "next-auth/react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
