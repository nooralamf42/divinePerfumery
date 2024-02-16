import React from "react";
import Card from "../card/Card";
import Container from "../container/Container";

function Products({products, admin=false}) {
  console.log(admin)
  return (
    <Container>
      <div className="p-5 flex flex-wrap justify-center gap-8">
        {
            products.map(product=><Card key={product.name} admin={admin} {...product} />)
        }
      </div>
    </Container>
  );
}

export default Products;
