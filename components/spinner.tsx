import React from "react"

import { cn } from "@/lib/utils"

import styles from "./spinner.module.css"

type Props = {
  /**
   * Default value is "w-5 h-5".
   */
  size?: string
  className?: string
}

function Spinner({ size = "w-5 h-5", className }: Props) {
  const bars = [...new Array(12)].map((_, index) => (
    <span
      key={index}
      className={cn(styles.spinner_bar, "bg-muted-foreground")}
    ></span>
  ))

  return (
   
      <div className={cn(size,className)}>
        <div className={cn(styles.spinner, size,)}>{bars}</div>
      </div>

  )
}

export default Spinner
