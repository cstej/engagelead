import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "postfix"> {
  prefix?: React.ReactNode
  postfix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, postfix, ...props }, ref) => {
    return (
      <>
        {prefix || postfix ? (
          <div
            className={cn(
              "relative flex h-9 items-center overflow-hidden rounded-md border border-input shadow-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring",
              className
            )}
          >
            {prefix && (
              <div className="flex h-full flex-col justify-center border-r border-input bg-primary-foreground px-3 py-1 text-muted-foreground">
                {prefix}
              </div>
            )}
            <input
              type={type}
              className={cn(
                "flex w-full bg-transparent px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              )}
              ref={ref}
              {...props}
            />
            {postfix && (
              <div className="flex h-full flex-col justify-center border-l border-input bg-primary-foreground px-3 py-1 text-muted-foreground">
                {postfix}
              </div>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }