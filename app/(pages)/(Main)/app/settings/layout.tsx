import React from "react"

type Props = {
  children: React.ReactNode
}

export default function SettingLayout({ children }: Props) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col space-y-4 ">
      {children}
    </div>
  )
}
