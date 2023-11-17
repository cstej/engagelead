import { AvatarProps } from "@radix-ui/react-avatar"
import { AvatarIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps extends AvatarProps {
  user: {
    image: string | undefined
    name: string
  }
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span>
            {user.name ? (
              `${user.name.split(" ")[0][0]}${
                user.name.split(" ")[1] ? user.name.split(" ")[1][0] : ""
              }`
            ) : (
              <AvatarIcon />
            )}
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  )
}
