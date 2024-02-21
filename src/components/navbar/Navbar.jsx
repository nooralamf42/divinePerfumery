import React, { useState } from "react";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import NavCart from "./NavCart";
import SideMenu from "../side menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import appwriteAuthService from "../../appwrite/auth";
import { toast } from "sonner";
import { logout } from "../../store/appSlice";
import Cart from "../cart/Cart";

function Navbar() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.logout().then(() => {
      toast("Logged out successfully!");
      dispatch(logout());
    }).catch(error=>toast(error.message))
  };
  const [isCartClicked, setIsCartClicked] = useState(false)
  return (
    <nav className="py-5 border-b sticky top-0 bg-white z-20">
      <Cart isCartClicked={isCartClicked} setIsCartClicked={setIsCartClicked}/>
      <Container>
        <div className="flex justify-between items-center gap-3">
          <Logo />
          <div className="hidden sm:flex justify-center items-center text-xl gap-3">
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
          <div className="flex justify-between items-center gap-3">
            {isLogged ? (
              <Button
                name="Logout"
                onClick={logoutHandler}
                className={"hidden sm:inline-block"}
              />
            ) : (
              <Button
                name="Login"
                className={"hidden sm:inline-block"}
                link="/login"
              />
            )}
            <SideMenu logoutHandler={logoutHandler} className={"sm:hidden"} isLogged={isLogged} />
            <NavCart setIsCartClicked = {setIsCartClicked}/>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
