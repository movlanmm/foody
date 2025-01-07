import React, { useState } from "react";
import { CiTwitter, CiFacebook, CiPizza } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { GiSpottedMushroom } from "react-icons/gi";
import { IoLeafOutline } from "react-icons/io5";
import { PiPepperThin } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../../components/ProductCard";
import RestourantCard from "../../components/RestourantCard";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Home() {
  const [restourants, setRestourants] = useState([]);
  const [tab, setTab] = useState("All");
  const [menus, setMenus] = useState([]);

  const changeTab = (e) => {
    setTab(e.target.innerText);
  };

  const getRestourants = async () => {
    await getDocs(collection(db, "restourants")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRestourants(newData);
    });
  };

  const getMenu = async () => {
    try {
      const q = query(collection(db, "menu"), limit(8), orderBy("price"));
      await getDocs(q).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMenus(newData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestourants();
    getMenu();
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const h3variant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const h1variant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const pvariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const btnVarinat = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Foody</title>
      </Helmet>
      {/* Banner */}
      <section className="relative overflow-hidden mb-12">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="container flex mx-auto items-center min-h-dvh"
        >
          <div className="w-1/2 space-y-6">
            <motion.h3
              variants={h3variant}
              className="text-2xl font-bold text-main w-fit"
            >
              Food Time
            </motion.h3>
            <motion.h1
              variants={h1variant}
              className="text-3xl md:text-5xl lg:text-7xl font-bold"
            >
              Buy One Get Two
            </motion.h1>
            <motion.p
              variants={pvariant}
              className="text-[#616161] text-sm sm:text-lg"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              nihil eos molestias reiciendis.
            </motion.p>
            <div className="flex items-center gap-5">
              <motion.button
                variants={btnVarinat}
                className="border border-main py-4 px-7 rounded-full leading-tight font-bold hover:bg-main hover:text-white whitespace-nowrap text-xs md:text-base transition-colors"
              >
                Order Now
              </motion.button>
              <motion.div
                variants={containerVariant}
                className="flex text-xl sm:text-2xl gap-3 cursor-pointer"
              >
                <motion.div variants={childVariant}>
                  <CiTwitter className="hover:text-main" />
                </motion.div>
                <motion.div variants={childVariant}>
                  <CiFacebook className="hover:text-main" />
                </motion.div>
                <motion.div variants={childVariant}>
                  <FaTelegramPlane className="hover:text-main" />
                </motion.div>
                <motion.div variants={childVariant}>
                  <FaLinkedinIn className="hover:text-main" />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={childVariant}
            className="bg-banner rounded-tl-[100%] rounded-bl-[100%] bg-left rounded-br-[100%] bg-cover bg-no-repeat absolute -right-[20%] top-0 h-[50%] sm:h-[100%] md:w-[50%] w-[70%]"
          ></motion.div>
          <motion.div
            variants={childVariant}
            className="absolute top-3 left-[20%]  animate-wiggle "
          >
            <img
              src="/images/mushroom.svg"
              alt=""
              className="w-[50px] md:w-full"
            />
          </motion.div>

          <motion.div
            variants={childVariant}
            className="absolute top-[20%] left-[40%] md:left-[60%] -z-10  animate-wiggle "
          >
            <img
              src="/images/leaf.svg"
              alt=""
              className="w-[50px] md:w-[140px]"
            />
          </motion.div>

          <motion.div
            variants={childVariant}
            className="absolute top-[70%] left-[50%] -z-10  animate-wiggle "
          >
            <img
              src="/images/pepper.svg"
              alt=""
              className="w-[50px] md:w-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About us */}
      <section className="bg-[url('/public/images/pizza_01.png')] h-[650px] bg-no-repeat mb-16">
        <div className="h-full flex items-center justify-end">
          <div className="w-full sm:w-2/3 bg-[#f9f9f9] p-10 rounded-s-3xl">
            <ul className="flex flex-col items-center lg:flex-row gap-5">
              <li className="flex flex-col gap-3 p-4">
                <CiPizza fontSize={100} className="text-main" />
                <span className="text-lg font-bold font-deluis">
                  QUALITY PRODUCTS
                </span>
                <p className="text-[#616161]">
                  FoodMood is an international chain of family restaurants.
                </p>
              </li>
              <li className="flex flex-col gap-3">
                <TbTruckDelivery fontSize={100} className="text-main" />
                <span className="text-lg font-bold font-deluis">
                  Fast Delivery
                </span>
                <p className="text-[#616161]">
                  FoodMood is an international chain of family restaurants.
                </p>
              </li>
              <li className="flex flex-col gap-3">
                <GiKnifeFork fontSize={100} className="text-main" />
                <span className="text-lg font-bold font-deluis">
                  Family Recipes
                </span>
                <p className="text-[#616161]">
                  FoodMood is an international chain of family restaurants.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Discover */}

      <section>
        <div className="mx-auto text-center space-y-7">
          <span className="text-main text-2xl font-semibold">
            always quality
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">Discover Our Menu</h2>
          {/* <ul className="flex items-center justify-center gap-6 flex-wrap text-sm sm:text-lg font-bold cursor-pointer">
            <li
              onClick={changeTab}
              className={`${
                tab === "All" &&
                "bg-[url(/public/images/filter-bg.svg)] text-white"
              } px-8 py-1 transition-all`}
            >
              All
            </li>
            <li
              onClick={changeTab}
              className={`${
                tab === "Cheese" &&
                "bg-[url(/public/images/filter-bg.svg)] text-white"
              } px-8 py-1 transition-all`}
            >
              Cheese
            </li>
            <li
              onClick={changeTab}
              className={`${
                tab === "Meat" &&
                "bg-[url(/public/images/filter-bg.svg)] text-white"
              } px-8 py-1 transition-all`}
            >
              Meat
            </li>
            <li
              onClick={changeTab}
              className={`${
                tab === "Spisy" &&
                "bg-[url(/public/images/filter-bg.svg)] text-white"
              } px-8 py-1 transition-all`}
            >
              Spisy
            </li>
            <li
              onClick={changeTab}
              className={`${
                tab === "Vegan" &&
                "bg-[url(/public/images/filter-bg.svg)] text-white"
              } px-8 py-1 transition-all`}
            >
              Vegan
            </li>
          </ul> */}
        </div>
        <div className="container hidden mx-auto md:grid grid-cols-1 sm:grid-cols-2 gap-y-5 lg:grid-cols-4 mt-10 px-3 md:px-0">
          {menus.length > 0 &&
            menus.map((item, index) => <ProductCard key={index} item={item} />)}
        </div>
        <div className="container mx-auto relative md:hidden">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={false}
            navigation={{
              nextEl: ".arrow-next-prod",
              prevEl: ".arrow-prev-prod",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
                slidesPerGroup: 1,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 14,
                slidesPerGroup: 2,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
            }}
          >
            {menus.map((item) => (
              <SwiperSlide key={item.id} className="py-10">
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`arrow-next-prod absolute top-[50%] z-30 -translate-y-1/2 md:translate-x-1/2 right-0 bg-main shadow-md text-white rounded-full p-3 md:text-5xl`}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button className="arrow-prev-prod absolute top-[50%] z-30 -translate-y-1/2  md:-translate-x-1/2 left-0 bg-main shadow-md text-white rounded-full p-3 md:text-5xl">
            <MdOutlineKeyboardArrowRight className="rotate-180" />
          </button>
        </div>
        <div className="w-full col-span-4 flex justify-center mt-7">
          <Link
            to={"/shop"}
            className="border-main border rounded-full px-10 py-3 text-xl font-bold hover:bg-black hover:text-white transition-colors hover:border-black cursor-pointer "
          >
            View All
          </Link>
        </div>
      </section>

      <section className="bg-[#eaa53b] relative py-16 grid items-center mt-10">
        <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-white font-bold w-4/5 text-center">
          <li>
            <span className="text-3xl md:text-6xl mb-4 block">
              <CountUp
                start={0}
                end={150}
                duration={3}
                enableScrollSpy={true}
                scrollSpyDelay={100}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>{" "}
              +
            </span>
            <p className="text-xl">Burgers at Hour</p>
          </li>
          <li>
            <span className="text-3xl md:text-6xl mb-4 block">
              <CountUp
                start={0}
                end={47}
                duration={3}
                enableScrollSpy={true}
                scrollSpyDelay={100}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </span>
            <p className="text-xl">Skilled Professionals</p>
          </li>
          <li>
            <span className="text-3xl md:text-6xl mb-4 block">
              <CountUp
                start={0}
                end={2450}
                duration={3}
                enableScrollSpy={true}
                scrollSpyDelay={100}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
              +
            </span>
            <p className="text-xl">Orders Everyday</p>
          </li>
          <li>
            <span className="text-3xl md:text-6xl mb-4 block">
              <CountUp
                start={0}
                end={340}
                duration={3}
                enableScrollSpy={true}
                scrollSpyDelay={100}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
              +
            </span>
            <p className="text-xl">Cups of Coffee</p>
          </li>
        </ul>
      </section>

      <section className="my-10">
        <h2 className="container mx-auto md:text-6xl text-4xl font-bold">
          Restounrants
        </h2>
        <div className="container mx-auto py-10 relative">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={false}
            navigation={{
              nextEl: ".arrow-next",
              prevEl: ".arrow-prev",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
                slidesPerGroup: 1,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 14,
                slidesPerGroup: 2,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
            }}
          >
            {restourants.map((item) => (
              <SwiperSlide key={item.id}>
                <RestourantCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`arrow-next absolute top-[50%] z-30 -translate-y-1/2 md:translate-x-1/2 right-0 bg-main shadow-md text-white rounded-full p-3 md:text-5xl`}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button className="arrow-prev absolute top-[50%] z-30 -translate-y-1/2  md:-translate-x-1/2 left-0 bg-main shadow-md text-white rounded-full p-3 md:text-5xl">
            <MdOutlineKeyboardArrowRight className="rotate-180" />
          </button>
        </div>
      </section>

      <section className="bg-[#f9f9f9] relative overflow-hidden px-2 md:px-0">
        <div className="flex items-center flex-wrap py-5 md:py-0">
          <div className="w-full lg:w-1/2 md:ps-10 space-y-8">
            <span className="text-main">fast delivery</span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Get Free & Fast <br /> Delivery with Our App
            </h2>
            <p className="font-thin text-sm md:text-base text-[#616161] w-4/5">
              FoodMood is an international chain of fast food restaurants, which
              has an experience of opening more than 170 restaurants.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="border w-full md:w-fit whitespace-nowrap border-main rounded-full bg-main text-white font-bold px-10 py-4 hover:bg-white hover:text-main transition-all duration-500">
                App Store
              </button>
              <button className="border w-full md:w-fit border-main rounded-full px-10 py-4 hover:bg-main hover:text-white transition-all duration-500">
                Google Play
              </button>
            </div>
          </div>
          <motion.div
            initial={{ translateY: "100%" }}
            whileInView={{
              translateY: 0,
              transition: { type: "spring", duration: 0.8 },
            }}
            viewport={{ once: true }}
          >
            <img src="/images/phone.png" alt="phone" className="w-4/5" />
          </motion.div>
          <div className="absolute -right-[70%] lg:-right-[30%] hidden sm:block">
            <img src="/images/pizza_05.png" />
          </div>
        </div>
      </section>
    </main>
  );
}
