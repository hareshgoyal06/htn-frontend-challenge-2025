"use client";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ParallaxScroll from "../components/ParallaxScroll";
import Navbar from "../components/Navbar";
import LoginButton from "../components/LoginButton";

const benefits = [
  {
    title: "Building an awesome project",
    description: "Collaborate with others and build something groundbreaking.",
    image: "/images/projectsHTN.jpg", // Replace with actual image URL
  },
  {
    title: "Free food",
    description: "Enjoy delicious meals and snacks throughout the event.",
    image: "/images/foodHTN.jpg", // Replace with actual image URL
  },
  {
    title: "Free swag",
    description: "Grab exclusive merch, stickers, and cool prizes!",
    image: "/images/swagHTN.jpg", // Replace with actual image URL
  },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState("/images/swagHTN.jpg"); // Default image
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParallaxScroll />
      </div>
      <LoginButton />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Title */}
        <header className="mb-6 mt-12 text-center">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl font-press-start-2p text-white relative shine neon-text gradient-outline">
            Hackathon Inc.
          </h1>
        </header>

        {/* Description with Background */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-lg max-w-3xl text-center">
          <p className="text-gray-200 text-lg">
            <span className="text-blue-300 font-semibold">On September 7th</span>, get ready to hack for 36 hours! Work alongside passionate developers, designers, and entrepreneurs. Build something incredible, make lifelong connections, and experience the ultimate hackathon adventure.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl mt-6">
          {/* Left Side - Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/90 p-4 rounded-lg border border-gray-700 shadow-lg cursor-pointer hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(benefit.image)}
              >
                <h3 className="text-blue-300 font-bold text-lg">{benefit.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Dynamic Image Display */}
          <motion.div
            className="hidden lg:block w-96 h-60 rounded-lg overflow-hidden border border-gray-700 shadow-lg"
            key={selectedImage} // Forces re-render on image change
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={selectedImage}
              alt="Benefit Preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
    
    </div>
  );
}
