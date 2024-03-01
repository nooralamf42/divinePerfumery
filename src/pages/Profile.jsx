import { RxCross1 } from "react-icons/rx"; 
import { AiOutlineCheckCircle } from "react-icons/ai"; 
import React from 'react'
import { useSelector } from "react-redux";

function Profile() {
    const {name, emailVerification, email} = useSelector(state=>state.userData)
  return (
    <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    User Info
                  </h1>
                  <h2 className="text-xl">
                    <span className="font-semibold">Name : </span>{name}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-semibold">Email : </span>{email}
                  </h2>
                  <h2 className="text-xl flex items-center gap-2">
                    <span className="font-semibold">Email Verified  </span>{emailVerification ? <AiOutlineCheckCircle color="green" size={25}/> : <RxCross1 color="red" size={25}/>}
                  </h2>
               
                  {/* <Button name={"Update address"} onClick={clickHandler} /> */}
                </div>
              </div>
            </div>
          </section>
  )
}

export default Profile