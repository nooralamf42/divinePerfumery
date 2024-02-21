import { AiOutlineShoppingCart } from "react-icons/ai"; 
import React from 'react'
import { useSelector } from "react-redux";

function NavCart({setIsCartClicked}) {
  let cartItemsLength = useSelector(state=>state.cartProducts.length)
  return (
    <div onClick={()=>setIsCartClicked(prev=>!prev)} className="relative cursor-pointer"><AiOutlineShoppingCart size={33}/>
    <div className={`w-5 h-5 flex justify-center items-center rounded-full absolute -top-1 -right-2 text-white ${cartItemsLength<=0 ? 'bg-red-500' : 'bg-green-500'}`}>
        {cartItemsLength}
    </div>
    </div>
  )
}

export default NavCart