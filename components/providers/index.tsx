import React from "react"

import AuthProvider from "./auth-provider"
import { ThemeProvider } from "./theme-provider"
import {TRPCReactProvider} from "@/components/providers/trpc-react"
import { headers } from "next/headers"

type Props = {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  return (
    <TRPCReactProvider headers={headers()}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </TRPCReactProvider>
  )
}

export default Providers
