import React from "react";
import { Card, Container, Hero, Products } from "../components";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { nanoid } from "@reduxjs/toolkit";

const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://picsum.photos/id/11/300/300",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://picsum.photos/id/12/300/300",
    badge: "Mentor",
  },
  {
    name: "Jane Smith",
    designation: "Product Manager, Innovate Inc",
    image: "https://picsum.photos/id/13/300/300",
    badge: "Mentor",
  },
  {
    name: "Robert Johnson",
    designation: "Data Scientist, DataWorks",
    image: "https://picsum.photos/id/14/300/300",
    badge: "Mentor",
  },
  {
    name: "Emily Davis",
    designation: "UX Designer, DesignHub",
    image: "https://picsum.photos/id/15/300/300",
    badge: "Mentor",
  },
  {
    name: "Michael Miller",
    designation: "CTO, FutureTech",
    image: "https://picsum.photos/id/16/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Brown",
    designation: "CEO, StartUp",
    image: "https://picsum.photos/id/17/300/300",
  },
  {
    name: "James Wilson",
    designation: "DevOps Engineer, CloudNet",
    image: "https://picsum.photos/id/18/300/300",
    badge: "Something",
  },
  {
    name: "Patricia Moore",
    designation: "Marketing Manager, MarketGrowth",
    image: "https://picsum.photos/id/19/300/300",
    badge: "Mentor",
  },
  {
    name: "Richard Taylor",
    designation: "Frontend Developer, WebSolutions",
    image: "https://picsum.photos/id/20/300/300",
  },
  {
    name: "Linda Anderson",
    designation: "Backend Developer, ServerSecure",
    image: "https://picsum.photos/id/21/300/300",
  },
  {
    name: "William Thomas",
    designation: "Full Stack Developer, FullStack",
    image: "https://picsum.photos/id/22/300/300",
    badge: "Badger",
  },
  {
    name: "Elizabeth Jackson",
    designation: "Project Manager, ProManage",
    image: "https://picsum.photos/id/23/300/300",
    badge: "Mentor",
  },
  {
    name: "David White",
    designation: "Database Administrator, DataSafe",
    image: "https://picsum.photos/id/24/300/300",
    badge: "Advocate",
  },
  {
    name: "Jennifer Harris",
    designation: "Network Engineer, NetConnect",
    image: "https://picsum.photos/id/25/300/300",
  },
  {
    name: "Charles Clark",
    designation: "Security Analyst, SecureIT",
    image: "https://picsum.photos/id/26/300/300",
  },
  {
    name: "Susan Lewis",
    designation: "Systems Analyst, SysAnalyse",
    image: "https://picsum.photos/id/27/300/300",
  },
  {
    name: "Joseph Young",
    designation: "Mobile Developer, AppDev",
    image: "https://picsum.photos/id/28/300/300",
    badge: "Mentor",
  },
  {
    name: "Margaret Hall",
    designation: "Quality Assurance, BugFree",
    image: "https://picsum.photos/id/29/300/300",
    badge: "Developer",
  },
];

const heroImage =
  "https://images.pexels.com/photos/17155333/pexels-photo-17155333/free-photo-of-close-up-of-bottles-perfume-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const featureProducts = ['featured products', 'featured products','featured products','featured products','featured products','featured products',]

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
      <section>
        <Hero/>
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
              featureProducts.map(product=><h1 key={nanoid} className="font-extralight whitespace-nowrap animate-infinite py-2 px-12 text-xl sm:text-5xl md:text-8xl text-center uppercase">{product}</h1>)
            }
          </div>
        <Container>
          <div className="text-center">
            <Products products={categories}/>
          </div>
        </Container>
      </section>
      <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        users={users}
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
            Your fragrance journey begins with a<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
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
