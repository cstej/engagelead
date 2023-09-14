import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function SettingLayout({children}: Props) {
  return (
    <div className="flex min-h-screen flex-col" >{children}</div>
  )
}