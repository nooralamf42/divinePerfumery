import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { toast } from "sonner";
import { setAddress } from "../../store/appSlice";
import { useNavigate } from "react-router-dom";

function AddressForm() {
  const {userId} = useSelector(state=>state.userData)
  const oldAddress = useSelector(state=>state.userAddress)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, register } = oldAddress=== null ? useForm() : useForm({values: {
    street : oldAddress.street,
    city : oldAddress.city,
    state : oldAddress.state,
    pincode : oldAddress.pincode,
    mobile : oldAddress.pincode
  }})
  const submit = (data) => {
    if(oldAddress){
      appwriteService.updateUserAddress(data, userId).then(()=>
    {
      toast.success("Address Updated")
      dispatch(setAddress(data))
      navigate('/address')
    }).catch(e=>toast.error(e.message))
    }
      
    else {
      appwriteService.createUserAddress(data, userId).then(()=>
    {
      toast.success("Address Updated")
      dispatch(setAddress(data))
      navigate('/address')
    }).catch(e=>toast.error(e.message))
    }
  };
  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Address
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(submit)}
            >
              <div>
                <label
                  htmlFor="street"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street Name
                </label>
                <input
                  type="text"
                  {...register("street", { required: true })}
                  name="street"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your city
                </label>
                <input
                  type="text"
                  {...register("city", { required: true })}
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your state
                </label>
                <input
                  type="text"
                  {...register("state", { required: true })}
                  name="state"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pin Code
                </label>
                <input
                  type="number"
                  {...register("pincode", { required: true })}
                  name="pincode"
                  id="pincode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  {...register("mobile", { required: true })}
                  type="number"
                  name="mobile"
                  id="mobile"
                  maxLength={10}
                  minLength={10}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {oldAddress === null ? 'Add Address' : "Update Address"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddressForm;
