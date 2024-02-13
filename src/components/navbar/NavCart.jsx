import { AiOutlineShoppingCart } from "react-icons/ai"; 
import React from 'react'

function NavCart({value=0}) {
  return (
    <div className="relative"><AiOutlineShoppingCart size={33}/>
    <div className={`w-5 h-5 flex justify-center items-center rounded-full absolute -top-1 -right-2 text-white ${value<=0 ? 'bg-red-500' : 'bg-green-500'}`}>
        {value}
    </div>
    </div>
  )
}

export default NavCart