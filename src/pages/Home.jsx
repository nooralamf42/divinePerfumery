import React, { useEffect } from "react";
import {Card, Container, Hero, Products } from "../components";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { nanoid } from "@reduxjs/toolkit";
import featuredProducts from "../images/featuredImages/featuredImages";
import { useSelector } from "react-redux";


const heroImage =
  "https://images.pexels.com/photos/17155333/pexels-photo-17155333/free-photo-of-close-up-of-bottles-perfume-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const featuredProductText = ['featured products', 'featured products','featured products','featured products','featured products','featured products',]

function Home() {
  const products = useSelector(state=>state.allProducts)
  return (
    <>
      {/* <section>
        <Hero/>

      </section> */}

      <section>
          <div className="flex overflow-hidden md:my-20">
            {
              featuredProductText.map(product=><h1 key={nanoid} className="font-extralight whitespace-nowrap animate-infinite py-2 px-12 text-xl sm:text-5xl md:text-8xl text-center uppercase">{product}</h1>)
            }
          </div>
        <Container>
          <div className="text-center">
            <Products products={products}/>
          </div>
        </Container>
      </section>
      <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        products={products}
        titleComponent={
          <>
            <h1 className="md:text-4xl font-semibold text-black dark:text-white">
            Your fragrance journey begins with a<br />
              <span className="text-5xl md:text-[6rem] font-bold leading-none">
              Swipe
              </span>
            </h1>
          </>
        }
      />
    </div>
    </>
  );
}

export default Home;
