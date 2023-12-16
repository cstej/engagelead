import React from "react"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"

import { Input } from "./input"

type Props = {
  isVisible?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export default function PasswordInput(props: Props) {
  const { isVisible } = props
  const [showPassword, setShowPassword] = React.useState(isVisible)

  const togglePasswordVisibility = () => {
    setShowPassword((show) => !show)
  }

  return (
    <Input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      {...props}
      postfix={
        showPassword ? (
          <EyeNoneIcon
            className="h-4 w-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <EyeOpenIcon
            className="h-4 w-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )
      }
    />
  )
}
