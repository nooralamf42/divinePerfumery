import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";

function Hero() {
    const images = [
        "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ];
  return (
    <ImagesSlider className="h-screen" images={images}>
<motion.div
  initial={{
    opacity: 0,
    y: -80,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
  }}
  className="z-50 flex flex-col justify-center items-center"
>
  <motion.p className="font-bold text-5xl md:text-6xl text-center bg-clip-text text-white pt-4">
    Divine <br className="sm:hidden"/>Perfumers
  </motion.p>
  
  <motion.p className="font-bold text-xl md:text-3xl text-gray-200 text-center py-4">
    Perfumes are the feelings of flowers
  </motion.p>
</motion.div>
</ImagesSlider>
  )
}

export default Hero