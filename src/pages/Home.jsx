import React from "react";
import { Card, Container, Products } from "../components";

const heroImage =
  "https://images.pexels.com/photos/17155333/pexels-photo-17155333/free-photo-of-close-up-of-bottles-perfume-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const categories = [
  {
    name: "Musk",
    images: ["https://houseofattar.co.uk/wp-content/uploads/2022/09/Black-Musk-12ml.jpg"],
  },
  {
    name: "Oudh",
    images: ["https://kannaujattar.com/wp-content/uploads/2017/08/dehnal-oud-attar-kannauj-scaled.jpg"],
  },
  {
    name: "Mitti",
    images: ["https://m.media-amazon.com/images/I/712HL57L7WL.jpg"],
  },
];

function Home() {
  return (
    <>
      <section className="mt-12">
        <Container>
          <div className="flex flex-col sm:flex-row flex-wrap h-[90vh] items-center sm:justify-between">
            <div className="w-4/5 sm:w-[30%] h-[70%] bg-black overflow-hidden rounded-2xl">
              <img
                className="object-bottom object-cover h-full w-full"
                src={heroImage}
                alt=""
                srcset=""
              />
            </div>
            <div className="w-[70%] text-right box-border pt-12">
              <h1 className="text-3xl sm:text-4xl md:text-7xl drop-shadow-2xl hover:scale-105 duration-200 hover:-rotate-1 leading-none hover:cursor-pointer">
                DIVINE PERFUMERS
              </h1>
              <p className="sm:pt-5 text-sm sm:text-xl">
                "Perfumes are the feelings of flowers"
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section>
            <h1 className="text-white bg-gray-600 py-2 text-xl sm:text-3xl md:text-4xl text-center uppercase">featured products</h1>
        <Container>
          <div className="text-center">
            <Products products={categories}/>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
