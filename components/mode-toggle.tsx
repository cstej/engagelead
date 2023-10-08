"use client"

import * as React from "react"
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
    //       <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       <Icons.sun className="mr-2 h-4 w-4" />
    //       <span>Light</span>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       <Icons.moon className="mr-2 h-4 w-4" />
    //       <span>Dark</span>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>
    //       <Icons.laptop className="mr-2 h-4 w-4" />
    //       <span>System</span>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <Tabs  className="rounded-full" defaultValue={theme}>
      <TabsList>
        <TabsTrigger className="rounded-full p-2"  value="light" onClick={() => setTheme("light")}>
          {" "}
          <SunIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger className="rounded-full p-2" value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger className="rounded-full p-2" value="system" onClick={() => setTheme("system")}>
          <LaptopIcon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
