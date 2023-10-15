
import React from "react"
import MobileNav from "./_components/MobileNav"
import { SideBar } from "./_components/SideBar"


type Props = {
  children: React.ReactNode
}

const DashboardLayout =  async({ children }: Props) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className=" grid flex-1 md:grid-cols-[250px_1fr]">
        <div className="hidden md:z-20 md:flex md:flex-col ">
          <SideBar  />
        </div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <div className="fixed bottom-0">
        <MobileNav />
      </div>
    </div>
  )
}

export default DashboardLayout
