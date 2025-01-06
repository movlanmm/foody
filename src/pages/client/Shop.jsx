import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import BestSeller from "../../components/BestSeller";
import { useEffect } from "react";
import {
  collection,
  endAt,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/lib/cartSlice";
import { Helmet } from "react-helmet";

export default function Shop() {
  const [range, setRange] = useState([0, 50]);
  const cart = useSelector((state) => state.cartSlice.cart);
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [last, setLast] = useState();
  const [end, setEnd] = useState();
  const [pages, setPages] = useState([]);
  const [results, setResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const dispatch = useDispatch();

  const pageCount = async () => {
    let pages = [];
    const coll = collection(db, "menu");
    const snapshot = await getCountFromServer(coll);
    setResults(snapshot.data().count);
    for (let i = 1; i <= Math.ceil(snapshot.data().count / 9); i++) {
      pages.push(i);
    }
    setPages(pages);
  };

  const getMenu = async () => {
    const q = query(
      collection(db, "menu"),
      limit(9),
      orderBy("price", `${sort}`)
    );
    await getDocs(q).then((querySnapshot) => {
      setEnd(querySnapshot.docs[0]);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMenus(newData);
      setFilteredMenus(newData);
    });
  };

  const filterProducts = async () => {
    const q = query(
      collection(db, "menu"),
      limit(9),
      orderBy("price"),
      startAt(range[0]),
      endAt(range[1])
    );
    await getDocs(q).then((querySnapshot) => {
      setEnd(querySnapshot.docs[0]);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMenus(newData);
    });
  };

  const nextPage = async () => {
    setCurrentPage(currentPage + 1);
    const q = query(
      collection(db, "menu"),
      limit(9),
      orderBy("price", `${sort}`),
      startAfter(last)
    );
    await getDocs(q).then((querySnapshot) => {
      setEnd(querySnapshot.docs[0]);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMenus(newData);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const prevPage = async () => {
    setCurrentPage(currentPage - 1);
    const q = query(
      collection(db, "menu"),
      limitToLast(9),
      orderBy("price", `${sort}`),
      endBefore(end)
    );
    await getDocs(q).then((querySnapshot) => {
      setEnd(querySnapshot.docs[0]);
      setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMenus(newData);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const searchProduct = (value) => {
    if (value.length > 0) {
      const filter = menus.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              value.toLowerCase() ||
                item.categories.toLowerCase().includes(value.toLowerCase())
            ) || item.tags.toLowerCase().includes(value.toLowerCase())
      );
      setMenus(filter);
    } else {
      setMenus(filteredMenus);
    }
  };

  useEffect(() => {
    getMenu();
    pageCount();
  }, []);

  useEffect(() => {
    getMenu();
  }, [sort]);

  const tags = [
    "beer",
    "burgers",
    "delicious",
    "fast food",
    "food mood",
    "good meal",
    "meat",
    "pizza",
  ];

  const subtotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    subtotal();
  }, [cart]);

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Shop</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 mt-7 gap-y-5 lg:gap-x-3 items-start">
        {/* Filtering */}
        <div className="min-w-[300px] order-2 lg:order-1 px-5 lg:px-0  ">
          <div>
            <div className="flex items-center w-full lg:w-fit border border-slate-200 rounded-full ps-4 pe-1 py-1">
              <input
                type="text"
                placeholder="Search ..."
                className="outline-none flex-1 placeholder:text-sm"
                onChange={(e) => {
                  searchProduct(e.target.value);
                }}
              />
              <button className="bg-black text-white p-3 rounded-full">
                <HiMagnifyingGlass />
              </button>
            </div>
            {/* Categories */}
            <h3 className="text-center text-2xl tracking-wide font-bold text-main mb-5 mt-8 font-deluis">
              CATEGORIES
            </h3>
            <ul className="space-y-5">
              <li className="group">
                <a
                  href="#"
                  className="font-bold group-hover:text-main transition-all duration-700"
                >
                  Burgers{" "}
                  <span className="text-[#979797] group-hover:text-black transition-all duration-700">
                    (9)
                  </span>
                </a>
              </li>
              <li className="group">
                <a
                  href="#"
                  className="font-bold group-hover:text-main transition-all duration-700"
                >
                  Drinks{" "}
                  <span className="text-[#979797] group-hover:text-black transition-all duration-700">
                    (5)
                  </span>
                </a>
              </li>
              <li className="group">
                <a
                  href="#"
                  className="font-bold group-hover:text-main transition-all duration-700"
                >
                  Pizza{" "}
                  <span className="text-[#979797] group-hover:text-black transition-all duration-700">
                    (3)
                  </span>
                </a>
              </li>
            </ul>
            {/* Categories end */}

            {/* Price range */}
            <div className="lg:w-4/5">
              <h3 className="text-center text-2xl tracking-wide font-bold text-main mb-5 font-deluis mt-7">
                PRICE
              </h3>
              <RangeSlider
                aria-label={["min", "max"]}
                defaultValue={[0, 50]}
                min={0}
                max={50}
                colorScheme="yellow"
                onChangeEnd={(val) => setRange(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} bgColor="orange" />
                <RangeSliderThumb index={1} bgColor="orange" />
              </RangeSlider>
              <div className="flex items-center justify-between mt-5">
                <button
                  onClick={() => filterProducts()}
                  className="bg-main text-white py-2 px-6 border border-main hover:bg-white hover:text-main rounded-full"
                >
                  Filter
                </button>
                <p className="font-bold">
                  Price: £{range[0]} - £{range[1]}
                </p>
              </div>
            </div>
            {/* Price range end */}

            {/* Best sellers */}

            <h3 className="text-center text-2xl tracking-wide font-bold text-main mb-5 font-deluis mt-7">
              BEST SELLERS
            </h3>
            <div className="space-y-3">
              {filteredMenus.slice(4, 7).map((item) => (
                <BestSeller item={item} key={item.id} />
              ))}
            </div>
            {/* Best sellers end */}

            {/* Tags */}
            <h3 className="text-center text-2xl tracking-wide font-bold text-main mb-5 font-deluis mt-7">
              TAGS
            </h3>
            <div className="flex flex-wrap gap-x-2 gap-y-4 items-center w-full md:w-4/5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="border rounded-full px-3 py-1 font-semibold text-sm hover:bg-main hover:text-white cursor-pointer transition-all duration-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tags end*/}

            {/* Shopping cart */}

            <h3 className="text-center text-2xl tracking-wide font-bold text-main mb-5 font-deluis mt-7">
              SHOPPING CART
            </h3>

            {cart.length > 0 ? (
              <div>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="w-fit flex items-center gap-6 relative"
                    >
                      <img
                        src={item.images[0]}
                        alt="best_seller"
                        className="w-1/4 object-contain rounded-xl"
                      />
                      <div className="space-y-1">
                        <span className="text-lg font-bold tracking-wide">
                          {item.name}
                        </span>
                        <h4 className="text-sm text-main font-bold">
                          <span className="text-[#979797]">
                            {item.quantity} x{" "}
                          </span>
                          {item.price}
                        </h4>
                      </div>
                      <button
                        className="absolute p-2 top-0 right-0"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <IoIosClose />
                      </button>
                    </div>
                  ))}
                </div>
                <h4 className="font-bold text-xl mt-3">
                  Subtotal:{" "}
                  <span className="text-main text-base">£{subtotal()}</span>
                </h4>
                <div className="flex items-center gap-4 mt-5">
                  <Link
                    to={"/cart"}
                    className="border border-main rounded-full bg-main text-white font-bold px-5 py-2 hover:bg-white hover:text-main transition-all duration-500"
                  >
                    View Cart
                  </Link>
                  <Link
                    to={"/checkout"}
                    className="border border-main rounded-full px-5 py-2 hover:bg-main hover:text-white transition-all duration-500"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-center">No item in the cart!</p>
            )}
            {/* Shopping cart end */}
          </div>
        </div>
        {/* Filtering end */}

        {/* Products */}
        <div className="col-span-3 order-1 lg:order-2 px-2">
          <div className="col-span-3 flex justify-between items-center gap-5">
            <p className="flex-1 text-[#979797] text-sm">
              Showing 1–9 of {results} results
            </p>
            <div className="border rounded-full p-3 w-[270px] flex items-center justify-between text-[#979797]">
              <select
                name="sort"
                id="sort"
                onChange={(e) => setSort(e.target.value)}
                className="flex-1 outline-none text-sm"
                defaultValue={"asc"}
              >
                <option value="asc">Sort by price:low to high</option>
                <option value="desc">Sort by price:high to low</option>
              </select>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-y-10">
            {menus.length > 0 ? (
              menus.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))
            ) : (
              <p className="text-center w-full col-span-3">No results found</p>
            )}
          </div>
          <div className="mt-8 col-span-3 text-center text-lg  flex items-center gap-4 justify-center">
            <button
              className={`${currentPage == 1 ? "hidden" : "flex"} rotate-180`}
              onClick={() => prevPage()}
            >
              <FaArrowRightLong />
            </button>
            <span className="text-main">{currentPage}</span>
            <button
              className={`${currentPage == pages.at(-1) ? "hidden" : "flex"}`}
              onClick={() => nextPage()}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
