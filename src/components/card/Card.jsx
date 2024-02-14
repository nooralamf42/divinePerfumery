import { MdModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";

function Card({
  featuredImage,
  name,
  description=null,
  price = null,
  isNew = false,
  discountPrice = null,
  className = "",
  admin = false,
}) {
  return (
    <div className="w-[250px] rounded-2xl border shadow-md overflow-hidden relative mt-4">
      <div className="h-[300px] bg-black overflow-hidden">
        <img
          src={featuredImage}
          className="object-cover h-full hover:scale-110 duration-300 hover:brightness-100 hover:saturate-[1.15] hover:blur-[0.5px] hover:cursor-pointer"
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
        {
            description && <p>{description}</p>
        }
        <p className={`${price == null ? "hidden" : "text-2xl"}`}>
          {!discountPrice ? (
            `₹ ${price}`
          ) : (
            <>
              <span className="line-through mr-2 text-lg">₹ {price}</span>
              <span className="font-semibold">₹{discountPrice}</span>
            </>
          )}
        </p>
      </div>

      <div className={!admin && 'hidden'}>
        <div className="absolute bottom-0 mb-12 border p-2 rounded-full hover:scale-105 cursor-pointer right-2">
          <AiOutlineClose />
        </div>
        <div className="absolute bottom-0 right-0 m-4 shadow-2xl hover:scale-110 cursor-pointer">
          <MdModeEdit />
        </div>
      </div>
    </div>
  );
}

export default Card;
