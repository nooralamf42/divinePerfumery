import { BsCartCheck } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteProduct,
  setSelectedProduct,
} from "../../store/appSlice";
import appwriteService from "../../appwrite/config";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "../button/Button";

function Card({
  images = [],
  name,
  description = null,
  price = [],
  isNew = false,
  className = "",
  admin = false,
  category = null,
  $id = null,
  userId = null,
  cartItems = null,
}) {
  const dispatch = useDispatch();

  let inCart = false;
  const isLogged = useSelector((state) => state.isLogged);

  cartItems.map((cartItem) => {
    if (cartItem.$id == $id) inCart = true;
  });

  const editHandler = (e) => {
    document.getElementById("addProductDialog").show();
    dispatch(
      setSelectedProduct({
        name,
        images,
        description,
        price,
        category,
        slug: $id,
      })
    );
  };

  const cartHandler = () => {
    let cartItem = { name, quantity: 1, price, description, images, $id };
    if (inCart) toast(`${name} is already in cart`);
    else {
      if (isLogged) {
        appwriteService
          .addToCart(cartItems, cartItem, userId)
          .then(() => {
            dispatch(addToCart(cartItem));
            toast(`${name} added in cart successfully`);
          })
          .catch((error) => console.log(error));
      } else {
        dispatch(addToCart(cartItem));
        toast(`${name} added in cart successfully`);
      }
    }
  };

  const deleteHandler = () => {
    appwriteService
      .deleteProduct($id)
      .then(() => {
        toast(`${name} product deleted`);
        dispatch(deleteProduct($id));
      })
      .catch((error) => toast(error));
  };

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + "...";
    }
  };

  const whatsAppHandler = () => {
    const message = "I want to buy " + name;
    const url = `https://api.whatsapp.com/send?phone=918445678654&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-[250px] rounded-2xl border shadow-md overflow-hidden relative mt-4">
      <div className="h-[300px] bg-black overflow-hidden">
        <img
          src={images[0]}
          className="object-cover h-full w-full hover:scale-110 duration-300 hover:brightness-100 hover:saturate-[1.15] hover:blur-[0.5px] hover:cursor-pointer"
          alt=""
          srcset=""
        />
      </div>
      {isNew && (
        <div className="absolute top-0 right-0 m-4 rounded-xl text-lg bg-green-500 drop-shadow-2xl text-white px-2">
          <h1>New</h1>
        </div>
      )}
      <div className="p-4 space-y-2">
        <h1 className="text-2xl">{name}</h1>
        {description && (
          <p>
            {!description.length > 50
              ? description
              : truncateString(description, 50)}
          </p>
        )}
        <p className={`${price.length < 1 ? "hidden" : "text-2xl"}`}>
          {price.length == 1 ? (
            `₹ ${price[0]}`
          ) : (
            <>
              <span className="line-through mr-2 text-lg">₹ {price[0]}</span>
              <span className="font-semibold">₹{price[1]}</span>
            </>
          )}
        </p>
        <Button
          name={"Buy Now"}
          onClick={whatsAppHandler}
        />
      </div>

      <div className={!admin && "hidden"}>
        <div
          // onClick={deleteHandler}
          className="absolute bottom-0 mb-12 border p-1.5 flex rounded-full hover:scale-105 cursor-pointer right-2"
        >
          <AlertDialog>
            <AlertDialogTrigger className="">
              <AiOutlineClose />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteHandler}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <button
          onClick={editHandler}
          className="absolute bottom-0 right-0 m-4 shadow-2xl hover:scale-110 cursor-pointer"
        >
          <MdModeEdit />
        </button>
      </div>

      <button
        // hidden={!admin}
        onClick={cartHandler}
        className="absolute m-3 right-0 top-0 shadow-[inset_0_0_0_2px_#616467] p-1.5 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200
          "
      >
        {!inCart ? <BiCartAdd size={22} /> : <BsCartCheck size={22} />}
      </button>
    </div>
  );
}

export default Card;
