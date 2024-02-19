import React from "react";
import Card from "../card/Card";
import Container from "../container/Container";

function Products({products, admin=false}) {
  return (
    <Container>
      <div className="p-5 flex flex-wrap justify-center gap-8">
        {
            products.length>0 ? products.map(product=><Card key={product.name} admin={admin} {...product} />) : <h1 className="pt-[20%] text-2xl">No products added</h1>
        }
      </div>
    </Container>
  );
}

export default Products;
