import React from 'react'

function Card({featuredImage, name, price=null, isNew= false, discountPrice= null, className=''}) {
  return (
    <div className='w-[250px] rounded-2xl border shadow-md overflow-hidden relative mt-4'>
        <div className='h-[300px] bg-black overflow-hidden'>
            <img src={featuredImage} className='object-cover h-full hover:scale-110 duration-300 hover:brightness-100 hover:saturate-[1.15] hover:blur-[0.5px] hover:cursor-pointer' alt="" srcset="" />
        </div>
        {
            isNew && 
            <div className='absolute top-0 right-0 m-4 rounded-xl text-lg bg-green-500 drop-shadow-2xl text-white px-2'>
                <h1>New</h1>
            </div>
        }
        <div className="p-4 space-y-2">
            <h1 className='text-2xl'>{name}</h1>
            <p className={`${price == null ? 'hidden' :  'text-2xl'}`}>
                {
                    !discountPrice? `₹ ${price}` : <><span className='line-through mr-2 text-lg'>₹ {price}</span><span className='font-semibold'>₹{discountPrice}</span></>
                }
            </p>
        </div>
    </div>
  )
}

export default Card