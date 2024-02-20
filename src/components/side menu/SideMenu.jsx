import { BiMenu } from "react-icons/bi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";

function SideMenu({ className, isLogged=false, logoutHandler}) {
  return (
    <div className={`${className}`}>
      <Sheet>
        <SheetTrigger>
          <BiMenu size={30} />
        </SheetTrigger>
        <SheetContent className="w-1/2 flex justify-center items-center flex-col">
          {/* <SheetHeader> */}
          <div className="flex-col flex text-lg items-center">
            <NavLink
              to="/products/all"
              className={({ isActive }) =>
                isActive && "text-green-500 after:border-b-2"
              }
            >
              Shop
            </NavLink>
            {/* <NavLink
              to="/products/men"
              className={({ isActive }) =>
                isActive && "text-green-500 before:border-b-2"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="products/women"
              className={({ isActive }) => isActive && "text-green-500"}
            >
              Women
            </NavLink> */}
          </div>
          <div className="text-center border-t-2 pt-4">
            {
                isLogged ? <Button onClick={()=>logoutHandler()} className='text-[1.1rem]' name={"Logout"} /> : <Button link={"/login"} className='text-[1.1rem]' name={"Login"} />
             }
             <br />
            <Button link={"/signup"} className={`text-[1.1rem] mt-2 ${isLogged && 'hidden'}`} name={"Signup"} />
          </div>
          {/* </SheetHeader> */}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideMenu;
