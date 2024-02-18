import { MdModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, setSelectedProduct } from "../../store/appSlice";
import appwriteService from "../../appwrite/config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Card({
  images=[],
  name,
  description=null,
  price = [],
  isNew = false,
  className = "",
  admin = false,
  category = null,
  $id = null
}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const editHandler = (e) =>{
    document.getElementById('addProductDialog').show()
    dispatch(setSelectedProduct({name, images, description, price, category, slug: $id}))
  }

  const deleteHandler  = () =>{
    appwriteService.deleteProduct($id).then(()=>{
      toast(`${name} product deleted`)
      dispatch(deleteProduct($id))
    }).catch(error => toast(error))
  }

  const truncateString = (str, maxLength) =>{
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + '...';
    }
  }

  const whatsAppHandler = () =>{
    const message = 'I want to buy ' + name + ' 6ml'
    const url = `https://api.whatsapp.com/send?phone=918445678654&text=${message}`
    window.location.href = url
  }

  return (
    <div className="w-[250px] rounded-2xl border shadow-md overflow-hidden relative mt-4" onClick={whatsAppHandler}>
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
        {
            description && <p>{!description.length>50 ? description : truncateString(description, 50)}</p>
        }
        <p className={`${price.length<1 ? "hidden" : "text-2xl"}`}>
          {price.length==1 ? (
            `₹ ${price[0]}/ 6ml`
          ) : (
            <>
              <span className="line-through mr-2 text-lg">₹ {price[0]}</span>
              <span className="font-semibold">₹{price[1]}/ 6ml</span>
            </>
          )}
        </p>
      </div>

      <div className={!admin && 'hidden'}>
        <div onClick={deleteHandler} className="absolute bottom-0 mb-12 border p-2 rounded-full hover:scale-105 cursor-pointer right-2">
          <AiOutlineClose />
        </div>
        <button onClick={editHandler} className="absolute bottom-0 right-0 m-4 shadow-2xl hover:scale-110 cursor-pointer">
          <MdModeEdit />
        </button>
      </div>
    </div>
  );
}

export default Card;