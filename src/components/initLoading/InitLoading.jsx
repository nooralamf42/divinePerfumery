import React from 'react'
import initImage from '../../images/initLoading/initLoading.png'
import './loading.css'

function InitLoading() {
  return (
    <div className='w-screen h-[100vh] sm:h-screen bg-black flex flex-col justify-center items-center gap-2'>
        <div className='aspect-square w-1/3 md:w-1/6 relative'>
          <div className='w-full h-full absolute left-0 right-0 loading overflow-hidden'></div>
          <img src={initImage} className='absolute w-full scale-105 top-0 bottom-0' alt="" srcset="" />
        </div>
        <h1 className='text-white text-xl leading-6 sm:text-4xl text-center font-20 relative '>Perfumes are the feelings<br/>of flowers</h1>
    </div>
  )
}

export default InitLoading