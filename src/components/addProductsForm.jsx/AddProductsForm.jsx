import { AiFillCloseCircle } from "react-icons/ai"; 
import React, { useEffect } from "react";
import Container from "../container/Container";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import { useCallback } from "react";
import appwriteService from "../../appwrite/config";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setSelectedProduct, updateProducts } from "../../store/appSlice";

function AddProductsForm() {
 
  const dispatch = useDispatch();
  const oldProduct = useSelector((state) => state.selectedProduct);
  const { register, watch, handleSubmit, setValue, getValues} = useForm(oldProduct &&{
    values: {
      name: oldProduct?.name || "",
      description: oldProduct?.description || "",
      category: String(oldProduct?.category) || "",
      featuredImage: oldProduct?.images[0] || "",
      images: (oldProduct?.length > 1 && oldProduct?.images.splice(1)) || "",
      price: oldProduct?.price[0] || "",
      discount: oldProduct?.price[1] || "",
      slug: oldProduct?.slug || "",
    },
  });

  const options = ['all', 'oudh', 'men']
  const catergoryHandler = (selectedValue) =>{
    let preCategoryValue = getValues('category')
    let categoryValue 
    if(!preCategoryValue.includes(selectedValue))
      if(preCategoryValue!=='')
        categoryValue = preCategoryValue + ', ' + selectedValue
      else
        categoryValue = preCategoryValue + selectedValue
    else
      categoryValue = preCategoryValue
    setValue('category', categoryValue)
  }

  const submit = (formData) => {
    const price =
      formData.discount !== ""
        ? [formData.price, formData.discount]
        : [formData.price];
    const images =
      formData.images !== ""
        ? [formData.featuredImage, formData.images]
        : [formData.featuredImage];

    const slug = formData.slug;
    delete formData.slug;
    delete formData.featuredImage;
    delete formData.discount;
    formData.category = formData.category.includes(',') ? formData.category.split(',') : formData.category === '' ? [] : [formData.category]
    const data = { ...formData, price, images };

    if (oldProduct) {
      appwriteService
        .updateProduct(data, slug)
        .then((product) => {
          console.log(product);
          document.getElementById("addProductDialog").close();
          toast("Product updated successfully");
          dispatch(updateProducts({ id: slug, updatedProduct: product }));
        })
        .catch((error) => toast(error));
    } else {
      console.log("in else");
      appwriteService
        .createProduct(data, slug)
        .then((product) => {
          dispatch(addProduct(product))
          document.getElementById("addProductDialog").close();
          toast("Product added successfully");
        })
        .catch((error) => toast(error));
    }

    dispatch(setSelectedProduct(null));
  };


  const slugTransform = useCallback((title) => {
    return title.toLowerCase().replace(/ /g, "-");
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name" && !oldProduct)
        setValue("slug", slugTransform(value.name));
    });
    return () => subscription.unsubscribe();
  }, [slugTransform]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2 bg-slate-200 px-10 py-20"
      >
        <input
          className="py-1 px-2 rounded-lg"
          {...register("name", { required: true })}
          type="text"
          required
          minLength={4}
          placeholder="product name"
        />

        <textarea
          className="py-1 px-2 rounded-lg"
          {...register("description")}
          type="text"
          placeholder="product description"
          minLength={12}
        />

        <input
          className="py-1 px-2 rounded-lg"
          {...register("featuredImage", { required: true })}
          required
          type="text"
          minLength={10}
          placeholder="featuredImage"
        />

        <input
          className="py-1 px-2 rounded-lg"
          minLength={10}
          {...register("images")}
          type="text"
          placeholder="images array"
        />

        <input
          className="py-1 px-2 rounded-lg"
          required
          {...register("price", { required: true })}
          type="number"
          min={10}
          placeholder="price"
        />

        <input
          className="py-1 px-2 rounded-lg"
          {...register("discount")}
          type="number"
          placeholder=" discount"
          min={10}
        />

        {/* <div className="flex gap-2 items-center py-1 px-2 rounded-lg bg-white w-fit">
          <label htmlFor="inStock">In Stock</label>
          <input
            className=""
            {...register("inStock", { required: false })}
            type="checkbox"
            id="inStock"
          />
        </div> */}
        <div className="relative">
          <input type="text" readOnly className="py-1 w-full px-2 rounded-lg bg-white" placeholder="category" {...register("category", { required: false })}/>
          <select
            className="absolute right-0 bg-white rounded-lg flex top-0 bottom-0"
          >
            {
              options.map(option=><option onClick={(e)=>catergoryHandler(e.target.value)} value={option} key={option}>{option.toUpperCase()}</option>)
            }
          </select>
          <button onClick={()=>setValue('category', '')} className="top-0 bottom-0 absolute right-16 mr-2">
            <AiFillCloseCircle size={25}/>
          </button>
        </div>

        {oldProduct ? (
          <input
            className="py-1 px-2 rounded-lg"
            required
            {...register("slug", { required: true })}
            type="text"
            placeholder="slug"
            readOnly
          />
        ) : (
          <input
            className="py-1 px-2 rounded-lg"
            required
            {...register("slug", { required: true })}
            type="text"
            placeholder="slug"
          />
        )}
        <Button
          name={oldProduct ? "Update Product" : "Create Product"}
          className={"mt-5 py-2"}
        />
      </form>
    </Container>
  );
}

export default AddProductsForm;








