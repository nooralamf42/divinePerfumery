import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import appwriteAuthService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { initiateRedux, login, setProducts } from "./store/appSlice";
import appwriteService from "./appwrite/config";
import { toast } from "sonner";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    appwriteAuthService.getLogged().then(userData=>{
      appwriteService.getCart(userData.$id).then((userItems)=>{
        userData.userId = userData.$id
        let userCart = userItems?.cartItems
        userCart = userCart.length>0 ? userCart.map(cart=>JSON.parse(cart)) : []
        dispatch(login({userData, userCart}))
      })
    })
    appwriteService.getAllProducts().then(products=>{
      dispatch(setProducts(products.documents))
      dispatch(initiateRedux())
    }).catch(error => toast(error))
  }, [])
  const isReduxInitiated = useSelector(state=>state.reduxInitiated)
  console.log(isReduxInitiated, 'redux init')
  return (
    <>
      <Navbar />
      {
        isReduxInitiated ? <Outlet /> : <div className="h-screen bg-black flex justify-center items-center text-white text-4xl">loading</div>
      }
      <Toaster />
    </>
  );
}

export default App;
