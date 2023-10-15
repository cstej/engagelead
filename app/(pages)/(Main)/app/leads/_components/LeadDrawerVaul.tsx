"use client"

import React from "react"
import { Drawer } from "vaul"

type Props = {
  children: React.ReactNode
}

function LeadDrawerVaul({ children }: Props) {
  return (
    <Drawer.Root >
      <Drawer.Trigger>{children}</Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />

        <Drawer.Content className="fixed bottom-0 right-0 mt-24 flex h-[100vh] flex-col rounded-t-[10px] ">
          <div className="flex-1 rounded-t-[10px] bg-background p-4 dark:bg-black">
            <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Unstyled drawer for React.
              </Drawer.Title>
              <p className="text-zinc-600 mb-2">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </p>
              <p className="text-zinc-600 mb-8">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&apos;s Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default LeadDrawerVaul
