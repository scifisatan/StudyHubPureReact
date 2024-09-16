import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types";

export function UserAvatar(props: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 overflow-hidden rounded-full"
          aria-label="User menu"
        >
          <img
            className="overflow-hidden rounded-full"
            src={props.user.avatar}
            width={32}
            height={32}
            alt={props.user.name}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span>{props.user.name}</span>
          <span className="font-normal">{props.user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to="/login"
            onClick={() => {
                localStorage.removeItem("userID"); 
            }}
          >
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
