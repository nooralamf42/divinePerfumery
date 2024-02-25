import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { removeFromCart } from "../../store/appSlice";
import { toast } from "sonner";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

export default function Cart({ isCartClicked, setIsCartClicked }) {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cartProducts);
  let userId = useSelector((state) => state.userData.userId);

  let total = 0;
  cartItems.map((cartItem) => {
    if (cartItem.price.length > 1) {
      total += Number(cartItem.price[1].split("/")[0]);
    } else {
      total += Number(cartItem.price[0].split("/")[0]);
    }
  });

  const isLogged = useSelector(state=>state.isLogged)

  const cartHandler = (cartItem) => {
    if(isLogged){
      appwriteService
      .removeFromCart(cartItems, cartItem, userId)
      .then(() => {
        dispatch(removeFromCart(cartItem));
        toast("Item removed successfully");
      })
      .catch((error) => console.log(error));
    }else{
      console.log(cartItem)
      dispatch(removeFromCart(cartItem));
        toast.message("Item removed successfully");
    }
  };

  const whatsAppHandler = () => {
    let message = "I want to buy ";
    cartItems.map(item=>{
      message += item.quantity>0 ? `(${item.quantity} x ${item.name} = ₹${item.price.length>1 ? item.price[1] : item.price[0]}) `: `${item.name} ` 
    })
    message+= `Total Price = ₹${total}`
    const url = `https://api.whatsapp.com/send?phone=918445678654&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <Transition.Root show={isCartClicked} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsCartClicked(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartClicked(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {!cartItems.length > 0 ? (
                              <h1 className="text-center text-2xl mt-10">
                                No items in cart
                              </h1>
                            ) : (
                              cartItems.map((product) => (
                                <li key={nanoid()} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link to={`/product/${product.slug}`}>
                                            {product.name}
                                          </Link>
                                        </h3>
                                        {product.price.length > 1 ? (
                                          <div>
                                            <p className="line-through text-center text-sm">
                                              ₹{product.price[0]}
                                            </p>
                                            <p>₹{product.price[1]}</p>
                                          </div>
                                        ) : (
                                          <p>₹{product.price[0]}</p>
                                        )}
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            cartHandler(product.$id)
                                          }
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {!cartItems.length > 0 ? (
                      <div className="border-t text-center border-gray-200 px-4 py-6 sm:px-6">
                        <button
                          type="button"
                          className="mx-auto rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => setIsCartClicked(false)}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`border-t border-gray-200 px-4 py-6 sm:px-6`}
                      >
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={whatsAppHandler}
                            className="flex items-center justify-center rounded-md w-full border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setIsCartClicked(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
