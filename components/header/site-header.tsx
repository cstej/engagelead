import Link from "next/link"
import { Bot } from "lucide-react"
import { getServerSession } from "next-auth"

import { NavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

import { SignoutBtn } from "./sign-out-btn"

export async function SiteHeader() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 w-full bg-background  shadow-sm ">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Nav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-8">
          {/* Navbar Menu */}
          <div className="hidden md:block">
            {siteConfig.mainNav?.length ? (
              <nav className="flex gap-6">
                {siteConfig.mainNav?.map(
                  (item, index) =>
                    item.href && (
                      <Link
                        key={index}
                        href={item.href}
                        aria-disabled={item.disabled}
                        className={cn(
                          "flex items-center text-sm font-medium ",
                          item.disabled && "cursor-not-allowed opacity-80"
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                )}
              </nav>
            ) : null}
          </div>

          {/* Navbar Right buttons */}
          <nav className="flex items-center space-x-5">
            {session ? (
              <>
                <Link
                  href={siteConfig.links.dashboard}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Dashbord
                </Link>
                <SignoutBtn />
              </>
            ) : (
              <>
                <Link
                  href={siteConfig.links.signup}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Signup
                </Link>
                <Link
                  href={siteConfig.links.login}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

interface NavProps {
  items?: NavItem[]
}

function Nav({ items }: NavProps) {
  return (
    <div>
      <Link href="/" className="flex items-center space-x-2">
        <Bot size={32} />

        <span className="inline-block text-xl font-extrabold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
