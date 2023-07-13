import Link from "next/link"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

import { ModeToggle } from "../mode-toggle"
import { SignoutBtn } from "./SignOutBtn"


import { NavItem } from "@/types/nav"
import { Icons } from "@/components/icons"


export async function SiteHeader() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Nav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">
            <ModeToggle />

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
                {/* <Link
                  href={siteConfig.links.signup}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Signup
                </Link> */}
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
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
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
  )
}
