import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import appwriteAuthService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, setProducts } from "./store/appSlice";
import appwriteService from "./appwrite/config";
import { toast } from "sonner";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    appwriteAuthService.getLogged().then(userData=>{
      appwriteService.getCart(userData.$id).then((userCart)=>{
        dispatch(login({userData, userCart}))
      })
    })

    appwriteService.getAllProducts().then(products=>{
      dispatch(setProducts(products.documents))
    }).catch(error => toast(error))
  }, [])
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
