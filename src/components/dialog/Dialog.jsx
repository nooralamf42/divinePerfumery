import { AiOutlineClose } from "react-icons/ai"; 
import React from 'react'
import Button from '../button/Button'
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../store/appSlice";

function Dialog({id, children}) {
  const dispatch = useDispatch()
  const closeDialog = () =>{
    document.getElementById('addProductDialog').close()
    dispatch(setSelectedProduct(null))
}
  return (
    <dialog id={id} className='w-full h-full fixed z-20 top-0 bottom-0 backdrop-blur-2xl bg-gray-50'>
      {
        children
      }
        <Button name={<AiOutlineClose />} className={'m-6 absolute top-0 right-0 aspect-square bg-white'} onClick={closeDialog}/>
    </dialog>
  )
}

export default Dialog