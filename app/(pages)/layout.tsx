import "@/styles/globals.css"

import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/auth-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Roboto ,Inter } from 'next/font/google'

const roboto = Roboto({
  weight: [ "300","400", "500" , "700", "900", ],
  style: ['normal', 'italic'],
  subsets: ['latin'],
 
})
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen   antialiased",
            roboto.className
        
          )}
        >
          <NextTopLoader showSpinner={false} />

          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col ">
                <div className="flex-1">{children}</div>
              </div>
              <Toaster />
              <TailwindIndicator />
            </ThemeProvider>
          </AuthProvider>
          <Analytics mode="production" />
        </body>
      </html>
    </>
  )
}
