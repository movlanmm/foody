import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ReviewCard from "../../components/ReviewCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/lib/cartSlice";
import { useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import ProductCard from "../../components/ProductCard";

export default function ProductSingle() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);

  const getProduct = async () => {
    try {
      const docRef = doc(db, "menu", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMenu = async () => {
    try {
      const q = query(collection(db, "menu"), limit(8));
      await getDocs(q).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRelated(newData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getMenu();
  }, []);

  const addToCart = (item) => {
    dispatch(addCart({ ...item, quantity }));
    toast({
      title: `${item.name} added to cart`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <main className="px-3">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product?.name}</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Shop</h1>
          <div className="flex gap-2 items-center font-semibold  whitespace-nowrap text-xs sm:text-sm">
            <Link to={"/shop"}>Shop</Link>
            <MdKeyboardArrowRight />
            <Link to={"/"}>Burgers</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Egg Burger</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Product review */}
        {product && (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <img
                src={product?.images[index]}
                alt="product-img"
                className="h-[550px] object-cover rounded-xl"
              />
              <div className="flex h-[150px] overflow-scroll w-full gap-3">
                {product?.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-full w-[200px] cursor-pointer border-2 hover:border-main hover:opacity-100 transition-all duration-300  rounded-xl p-2 ${
                      index === i
                        ? "border-2  border-main"
                        : "border-transparent opacity-45"
                    }`}
                  >
                    <img
                      src={img}
                      alt="product-img"
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-20">
              <div className="space-y-5 mb-5">
                <h1 className="font-extrabold text-4xl">{product.name}</h1>
                <div className="flex items-center text-base gap-1 text-main">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <span className="text-[#979797]">(2 customer reviews)</span>
                </div>
                <p className="text-main font-semibold text-2xl">
                  {product.price} ₼
                </p>
                <p className="text-[#616161] font-sans">{product.info}</p>

                <ul className="space-y-2">
                  <li className="flex gap-4 items-center">
                    <LuLoader2 className="text-main" />
                    <strong className="text-lg">
                      Portion Size
                      <span className="text-[#616161] text-base font-thin">
                        {" "}
                        - {product.portion} g{" "}
                      </span>
                    </strong>
                  </li>
                  <li className="flex gap-4 items-center">
                    <LuLoader2 className="text-main rotate-90" />
                    <strong className="text-lg">
                      Calories
                      <span className="text-[#616161] text-base font-thin">
                        {" "}
                        - {product.calories} kj{" "}
                      </span>
                    </strong>
                  </li>
                  <li className="flex gap-4 items-center">
                    <LuLoader2 className="text-main -rotate-3" />
                    <strong className="text-lg">
                      Availability in Food Mood
                    </strong>
                  </li>
                </ul>
              </div>

              <ul className="space-y-3 py-5 border-y mb-7">
                <li className="flex gap-4 items-center">
                  <strong>
                    SKU:
                    <span className="text-[#616161] text-base font-thin">
                      {" "}
                      {product.sku}{" "}
                    </span>
                  </strong>
                </li>
                <li className="flex gap-4 items-center">
                  <strong>
                    Category:
                    <span className="text-[#616161] text-base font-thin">
                      {" "}
                      {product.categories}{" "}
                    </span>
                  </strong>
                </li>
                <li className="flex gap-4 items-center">
                  <strong>
                    Tags:
                    <span className="text-[#616161] text-base font-thin">
                      {" "}
                      {product.tags}{" "}
                    </span>
                  </strong>
                </li>
              </ul>

              <div className="flex gap-5 whitespace-nowrap">
                <div className="flex justify-between items-center rounded-full whitespace-nowrap bg-slate-100 w-[120px] py-3 px-4 text-base sm:text-xl font-bold">
                  <button
                    className="text-main"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <TiMinus />
                  </button>
                  <span className="text-xl">{quantity}</span>
                  <button
                    className="text-main"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <TiPlus />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="border border-main rounded-full bg-main text-sm sm:text-base text-white font-bold px-10 py-4 hover:bg-white hover:text-main transition-all duration-500"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product review  end */}

        <Tabs
          variant="soft-rounded"
          colorScheme="black"
          align="center"
          className="w-full mt-10"
        >
          <TabList className="border w-fit py-1 px-2 rounded-full mb-8 gap-2">
            <Tab _selected={{ color: "white", bg: "black" }}>Description</Tab>
            <Tab _selected={{ color: "white", bg: "black" }}>Reviews(2)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel paddingBlock={10} paddingInline={0}>
              {product && (
                <p className="text-left text-[#616161] text-base tracking-wider  font-sans">
                  {product.info}
                </p>
              )}
            </TabPanel>
            <TabPanel>
              <div className="divide-y space-y-2">
                <ReviewCard />
                <ReviewCard />
              </div>

              <div className="mt-10 text-left">
                <h1 className="font-bold text-4xl mb-6">Add Review</h1>
                <div className="bg-[#f9f9f9] p-10 rounded-xl">
                  <form className="space-y-4">
                    <h1 className="text-[#616161] font-sans">
                      Your email address will not be published. Required fields
                      are marked *
                    </h1>
                    <div className="flex gap-5 items-center">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-1/2 border rounded-full outline-none py-3 px-6"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-1/2 border rounded-full outline-none py-3 px-6"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="checkbox" name="" id="" />
                      <span className="text-sm ">
                        {" "}
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg">Your rating</h3>
                    <div className="flex text-xs gap-1 text-main">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <textarea
                      name=""
                      id=""
                      rows="4"
                      placeholder="Your review"
                      className="border rounded-3xl py-3 px-6 outline-none  w-full"
                    ></textarea>
                    <button className="border border-main rounded-full bg-main text-white font-bold px-10 py-4 hover:bg-white hover:text-main transition-all duration-500">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="my-10">
          <h1 className="font-bold text-4xl mb-9">Related Products</h1>
          <div className="container mx-auto relative">
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
              {related.map((item) => (
                <SwiperSlide key={item.id} className="py-10">
                  <ProductCard item={item} />
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
        </div>
      </div>
    </main>
  );
}
