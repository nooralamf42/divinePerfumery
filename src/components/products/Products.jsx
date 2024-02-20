import React from "react";
import Card from "../card/Card";
import Container from "../container/Container";
import { useSelector } from "react-redux";

function Products({products, admin=false}) {
  let user = useSelector((state) => state.userData);
  let userId;
  if (user.userId) userId = user.userId;
  else userId = user.$id;
  return (
    <Container>
      <div className="p-5 flex flex-wrap justify-center gap-8">
        {
            products.length>0 ? products.map(product=><Card key={product.name} userId={userId} admin={admin} {...product} />) : <h1 className="pt-[20%] text-2xl">No products added</h1>
        }
      </div>
    </Container>
  );
}

export default Products;
