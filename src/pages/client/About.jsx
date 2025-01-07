import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { motion } from "framer-motion";
import { CiPizza } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">About</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">About</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-7 mb-10 px-5 md:px-0 flex flex-col lg:flex-row gap-10">
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: { type: "tween", duration: 0.5 },
          }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative">
            <div className="absolute top-0 left-0">
              <img src="/images/about-img.png" alt="about" />
            </div>
            <div>
              <img src="/images/about-img3.jpg" alt="about" />
            </div>
            <div className="absolute top-0">
              <img src="/images/about-img2.png" alt="about" />
            </div>
          </div>
        </motion.div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-xl md:text-4xl font-bold font-deluis text-main">
            best ingredients
          </h3>
          <h1 className="leading-relaxed text-2xl md:text-5xl font-bold">
            Only Quality Products for You
          </h1>
          <p className="text-[#616161] leading-relaxed text-sm md:text-base">
            FoodMood is an international chain of fast food restaurants, which
            has an experience of opening more than 170 restaurants
          </p>
          <ul className="space-y-2 text-[#616161] text-xs md:text-base">
            <li className="flex gap-4 items-center">
              <LuLoader2 className="text-main" />
              <p>Digital project planning and resourcing</p>
            </li>
            <li className="flex gap-4 items-center">
              <LuLoader2 className="text-main rotate-90" />
              <p>In-House digital consulting</p>
            </li>
            <li className="flex gap-4 items-center">
              <LuLoader2 className="text-main -rotate-3" />
              <p>Permanent and contract recruitement</p>
            </li>
          </ul>
          <button className="border w-full md:w-fit whitespace-nowrap border-main rounded-full bg-main text-white font-bold px-10 py-2 hover:bg-white hover:text-main transition-all duration-500">
            ORDER NOW
          </button>
        </div>
      </div>

      <div className="bg-[url(/public/images/section-bg-3.jpg)] py-10 bg-center bg-cover bg-no-repeat mb-10">
        <ul className="flex flex-col items-center justify-center md:flex-row gap-5 text-center text-white">
          <li className="flex flex-col items-center gap-3 p-4">
            <CiPizza fontSize={100} className="text-main" />
            <span className="text-lg font-bold font-deluis">
              QUALITY PRODUCTS
            </span>
            <p className="w-2/3">
              FoodMood is an international chain of family restaurants.
            </p>
          </li>
          <li className="flex flex-col items-center gap-3">
            <TbTruckDelivery fontSize={100} className="text-main" />
            <span className="text-lg font-bold font-deluis">Fast Delivery</span>
            <p className="w-2/3">
              FoodMood is an international chain of family restaurants.
            </p>
          </li>
          <li className="flex flex-col items-center gap-3">
            <GiKnifeFork fontSize={100} className="text-main" />
            <span className="text-lg font-bold font-deluis">
              Family Recipes
            </span>
            <p className="w-2/3">
              FoodMood is an international chain of family restaurants.
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
}
