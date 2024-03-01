import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import appwriteAuthService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { initiateRedux, login, setProducts, setAddress} from "./store/appSlice";
import appwriteService from "./appwrite/config";
import { toast } from "sonner";
import { InitLoading } from "./components";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    appwriteAuthService.getLogged().then(userData=>{
      appwriteService.getCart(userData.$id).then((userItems)=>{
        userData.userId = userData.$id
        let userCart = userItems?.cartItems
        userCart = userCart.length>0 ? userCart.map(cart=>JSON.parse(cart)) : []
        appwriteService.getUserAddress(userData.userId).then(userAddress =>dispatch(setAddress(userAddress)))
        dispatch(login({userData, userCart}))
      })
    })
    appwriteService.getAllProducts().then(products=>{
      dispatch(setProducts(products.documents))
      dispatch(initiateRedux())
    }).catch(error => toast(error))
  }, [])
  const isReduxInitiated = useSelector(state=>state.reduxInitiated)
  const [loading, setLoading] = useState(true)
  let timeOut = 1500
  useEffect(()=>{
    setTimeout(()=>{
      if(!isReduxInitiated){
        timeOut += 500 
      }
      else setLoading(false)
    }, timeOut)
  })
  console.log(isReduxInitiated, 'redux init')
  return (
    !loading ? 
    <>
      <Navbar />
      <Outlet /> 
      <Toaster position={'bottom-left'} className='hidden sm:flex'/>
      <Toaster position={'top-center'} className='sm:hidden'/>
    </> : <InitLoading/>
  );
}

export default App;
