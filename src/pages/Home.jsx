import React from "react";
import {Card, Container, Hero, Products } from "../components";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { nanoid } from "@reduxjs/toolkit";
import featuredProducts from "../images/featuredImages/featuredImages";


const heroImage =
  "https://images.pexels.com/photos/17155333/pexels-photo-17155333/free-photo-of-close-up-of-bottles-perfume-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const featuredProductText = ['featured products', 'featured products','featured products','featured products','featured products','featured products',]

function Home() {
  return (
    <>
      <section>
        <Hero/>
        {/* <img src={image1} alt="" srcset="" /> */}
        {/* <Container>
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
        </Container> */}
      </section>

      <section>
          <div className="flex overflow-hidden md:my-20">
            {
              featuredProductText.map(product=><h1 key={nanoid} className="font-extralight whitespace-nowrap animate-infinite py-2 px-12 text-xl sm:text-5xl md:text-8xl text-center uppercase">{product}</h1>)
            }
          </div>
        <Container>
          <div className="text-center">
            <Products products={featuredProducts}/>
          </div>
        </Container>
      </section>
      <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        products={[{name: 'oudh', image: 'https://www.liveabout.com/thmb/IiU1PYZqvrBo1lL7E49jOSY1uB0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-900954436-56412d7f11084ed3a6dac591a9f9dedd.jpeg', $id: 'hello'}]}
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
