import React from "react"

import AuthProvider from "./auth-provider"
import { ThemeProvider } from "./theme-provider"
import TrpcProvider from "./trpc-provider"

type Props = {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  return (
    <TrpcProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </TrpcProvider>
  )
}

export default Providers
