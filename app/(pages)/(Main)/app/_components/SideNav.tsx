"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardConfig } from "@/types"
import { motion } from "framer-motion"
import { Bell, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"

type Props = {
  sideNavItems: DashboardConfig["sidebarNav"]
  settingsNavItems: DashboardConfig["settingNav"]
}

interface ItemProps {
  item: any // replace 'any' with the actual type
  path: string
  index: number
  itemVariants: any // replace 'any' with the actual type
}

const Item = memo(({ item, path, index, itemVariants }: ItemProps) => {
  const isActive = path === item.href
  const isDisabled = item.disabled

  return (
    <li
      className={cn(
        "rounded-md  px-3 py-2 text-sm font-normal",
        isActive ? "bg-accent" : "hover:bg-accent hover:text-accent-foreground",
        isDisabled && "cursor-not-allowed opacity-80"
      )}
      key={index}
    >
      <Link href={isDisabled ? "/" : item.href}>
        <motion.div
          className={cn("group flex items-center justify-between")}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          key={index}
        >
          <div className="flex items-center gap-2">
            {React.cloneElement(item.icon, {
              className: "h-4 w-4 text-foreground",
            })}
            <span>{item.title}</span>
          </div>

          {isActive && (
            <div className="order-last">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </motion.div>
      </Link>
    </li>
  )
})

Item.displayName = "Item"

function SideNav({ sideNavItems, settingsNavItems }: Props) {
  const path = usePathname()

  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1 },
    }),
  }

  const isSettingsPath = path.includes("/settings")

  if (isSettingsPath) {
    return (
      <div>
        {/*  Back Button */}
        <Link
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "mb-2  rounded-l-none"
          )}
          href="/app"
        >
          <div className="group inline-flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-x-1" />
            <span className="group-hover:text-accent-foreground">
              Back to Dashboard
            </span>
          </div>
        </Link>

        {/*  Settings Nav */}
        <ul className="flex flex-col gap-1 pl-2 pr-4">
          {settingsNavItems.map((item, index) => {
            if (item.subItems) {
              // Render accordion component
              return (
                <li  key={index}>
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem
                    key={index}
                    value={item.title}
                    className="border-none"
                  >
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <AccordionTrigger className="rounded-md py-0 pr-3 hover:bg-accent hover:text-accent-foreground hover:no-underline">
                        <Item
                          key={index}
                          item={item}
                          path={path}
                          index={index}
                          itemVariants={itemVariants}
                        />
                      </AccordionTrigger>
                    </motion.div>
                    <AccordionContent className="mt-2 ">
                      <ul className="flex flex-col gap-1 pl-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <Item
                            key={subIndex}
                            item={subItem}
                            path={path}
                            index={subIndex}
                            itemVariants={itemVariants}
                          />
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                </li>
              )
            } else {
              // Render list item
              return (
                <Item
                  key={index}
                  item={item}
                  path={path}
                  index={index}
                  itemVariants={itemVariants}
                />
              )
            }
          })}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <ul className="flex flex-col gap-1 pl-2 pr-4">
        {sideNavItems.map((item, index) => (
          <Item
            key={index}
            item={item}
            path={path}
            index={index}
            itemVariants={itemVariants}
          />
        ))}
      </ul>
    </div>
  )
}

export default SideNav
