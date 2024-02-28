import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import appwriteService from "../appwrite/config";
import { addToCart } from "../store/appSlice";
import { nanoid } from "@reduxjs/toolkit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const dispatch = useDispatch()
  const { productId } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const isLogged = useSelector((state)=>state.isLogged)
  let user = useSelector((state) => state.userData);
  let userId;
  if (user.userId) userId = user.userId;
  else userId = user.$id;

  const product = allProducts.find((product) => product.$id === productId);
  const [activeImg, setActiveImage] = useState(product.images[0]);
  const [price, setPrice] = useState(product.price);
  const outOfStock = product.category.includes("!stock")

  let sizes = [2, 3, 5, 10, 20, 50, 100, 250];
  if((+product.price.find(price=>price.includes('/')).split('/')[1].replace('ml',''))>50)
    sizes = sizes.map(size=>size*100)

  const cartItems = useSelector(state=>state.cartProducts)
  function convertPrice(pricePerUnit, size) {
    const [rupees, ml] = pricePerUnit.split("/");
    let priceFor1ml = parseFloat(rupees) / parseFloat(ml);
    priceFor1ml = priceFor1ml.toFixed(2).replace(/\.0{1,2}$/, "");
    return priceFor1ml * size; // Return the price
  }

  const priceHandler = (size) => {
    if (product?.price.length <= 1) {
      setPrice([
        Math.round(convertPrice(product.price[0], size)) + " /" + size + "ml",
      ]);
    } else {
      const orignalPrice = Math.round(
        convertPrice(
          `${product.price[0]}/${product.price[1].split("/")[1]}`,
          size
        )
      );
      console.log(orignalPrice);
      const discountedPrice =
        Math.round(convertPrice(product.price[1], size)) + " /" + size + "ml";
      setPrice([orignalPrice, `${discountedPrice}`]);
    }
  };

  const cartHandler = () => {
    let cartItem = { name: product.name, quantity: 1, price, description : product.description, images: product.images, $id: nanoid(), slug: product.$id };
    let inCart= false
    cartItems.map(item=>{
      if(item.name == cartItem.name){
        if(item.price == price)
          inCart = true
      }
    })
    if (inCart) toast(`${product.name} is already in cart`);
    else {
      if (isLogged) {
        appwriteService
          .addToCart(cartItems, cartItem, userId)
          .then(() => {
            dispatch(addToCart(cartItem));
            toast(`${product.name} added in cart successfully`);
          })
          .catch((error) => console.log(error));
      } else {
        console.log(cartItem)
        console.log(cartItems)
        dispatch(addToCart(cartItem));
        toast(`${product.name} added in cart successfully`);
      }
    }
  };

  if (product)
    return (
      <div className="flex flex-col pb-10 justify-center lg:flex-row gap-16 lg:items-center w-fit p-4 mx-auto">
        <div className="flex flex-col gap-6 lg:w-2/4">
          <img
            src={activeImg}
            alt=""
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
          {
            product.images.length>1 && <div className="flex flex-row justify-center gap-4 h-24">
            {product.images.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
          }
        </div>
        {/* ABOUT */}
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className=" text-violet-600 font-semibold">
              Divine Perfumes
            </span>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          <p className="text-gray-700">{product.description}</p>
          <h6 className="text-2xl font-semibold">
            {price?.length == 1 ? (
              `₹ ${price[0]}`
            ) : (
              <>
                <span className="line-through mr-2 text-lg">₹ {price[0]}</span>
                <span className="font-semibold">₹{price[1]}</span>
              </>
            )}
          </h6>
          <div className="flex flex-row items-center gap-12">
            <form className="">
              {/* Sizes */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <RadioGroup className="mt-4">
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes.map((size) => (
                      <RadioGroup.Option
                        key={size}
                        onClick={() => priceHandler(size)}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            "cursor-pointer bg-white text-gray-900 shadow-sm",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size}ml
                            </RadioGroup.Label>

                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-md"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {
                !outOfStock ? <button
                onClick={cartHandler}
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button> :
              <button
              disabled
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Out of stock :(
            </button>

              }
            </form>
          </div>
        </div>
      </div>
    );
  else console.log("product nhi hai");
}
