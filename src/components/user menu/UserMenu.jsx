import {
  LogOut,
  User,
  LocateIcon
} from "lucide-react"
import { BiUserCircle } from "react-icons/bi"; 

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserMenu({logoutHandler}) {
    const userData = useSelector(state=>state.userData)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"px-0 py-0"}>
          <BiUserCircle size={35} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Welcome {userData.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LocateIcon className="mr-2 h-4 w-4" />
            <Link to='/address'>Address</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Link onClick={()=>logoutHandler()}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
