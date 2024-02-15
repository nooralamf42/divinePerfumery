import React, { useEffect } from "react";
import Container from "../container/Container";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import { useCallback } from "react";
import appwriteService from "../../appwrite/config";
import { toast } from "sonner";

function AddProductsForm() {
  const { register, watch, handleSubmit, setValue } = useForm();
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
    const data = { ...formData, price, images };

    appwriteService.createProduct(data, slug).then((product)=>{
      console.log(product)
      toast('Product added successfully')
      document.getElementById('addProductDialog').close()
    }).then(error =>toast(error))
  };

  const slugTransform = useCallback((title) => {
    return title.toLowerCase().replace(/ /g, "-");
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") setValue("slug", slugTransform(value.name));
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
        <select
          className="py-1 px-2 rounded-lg bg-white"
          {...register("category", { required: false })}
        >
          <option value="all">All</option>
          <option value="oudh">Oudh</option>
          <option value="rose">Rose</option>
        </select>
        <input
          className="py-1 px-2 rounded-lg"
          required
          {...register("slug", { required: true })}
          type="text"
          placeholder="slug"
        />

        <Button
          name={"Create Product"}
          className={"mt-5 py-2"}
        />
      </form>
    </Container>
  );
}

export default AddProductsForm;
