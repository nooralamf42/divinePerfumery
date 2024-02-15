import { AiOutlineClose } from "react-icons/ai"; 
import React from 'react'
import Button from '../button/Button'

function Dialog({id, children}) {
  const closeDialog = () =>{
    document.getElementById('addProductDialog').close()
}
  return (
    <dialog id={id} className='w-full h-full fixed z-20 top-0 bottom-0 backdrop-blur-2xl bg-gray-50'>
      {
        children
      }
        <Button name={<AiOutlineClose />} className={'m-20 aspect-square bg-white'} onClick={closeDialog}/>
    </dialog>
  )
}

export default Dialog