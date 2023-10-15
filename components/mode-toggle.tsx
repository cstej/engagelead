"use client"

import * as React from "react"
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
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
