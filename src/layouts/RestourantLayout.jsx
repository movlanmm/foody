import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { userLogout } from "../redux/lib/userSlice";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

export default function RestourantLayout({ children }) {
  const asideRef = useRef(null);
  const user = useSelector((state) => state.userSlice.user);
  const loading = useSelector((state) => state.loadingSlice.loading);
  const [restourant, setRestourant] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "Restourant") {
      navigate("/");
    }
  }, [user]);

  const getRestourant = async () => {
    try {
      const docRef = doc(db, "restourants", user.id);
      const docSnap = await getDoc(docRef);
      setRestourant(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestourant();
  }, []);

  const closeAside = (e) => {
    if (open && !asideRef.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  window.addEventListener("mousedown", closeAside);

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Restourant Dashboard | Foody</title>
      </Helmet>
      <div className="flex">
        <aside
          ref={asideRef}
          className={`w-[250px] z-50 p-4 pe-0  h-dvh bg-blue-600 fixed left-0 top-0 -translate-x-full md:-translate-x-[70%] transition-all duration-500  md:hover:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-[300px]"
          }`}
        >
          <div className="w-full h-full relative">
            <div
              className="absolute top-3 right-6 p-2"
              onClick={() => setOpen(false)}
            >
              <CgMenuGridO fontSize={25} color="#fff" />
            </div>
            <div className="pt-3">
              <h1 className="font-deluis ps-2 font-bold text-white mb-10">
                Foody
              </h1>
              <ul className="text-white text-base font-bold cursor-pointer space-y-5">
                <li id="aside-link" className="hover:text-blue-600 ps-2 py-2">
                  <Link to={"/restourant/dashboard"} className="w-full h-full">
                    Dashboard
                  </Link>
                </li>
                <li id="aside-link" className="hover:text-blue-600  ps-2 py-2">
                  <Link
                    to={"/restourant/dashboard/add-product"}
                    className="w-full h-full"
                  >
                    Add Product
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <div className={`px-2 md:px-0 container mx-auto md:pl-[70px] pt-6`}>
          <header className="flex justify-between items-center border-b pb-3 mb-16">
            <h1 className="text-base md:text-2xl font-bold hidden md:block ">
              Welcome to{" "}
              <span className="text-blue-600">{restourant.name}</span> Dashboard
            </h1>
            <button onClick={() => setOpen(true)} className="md:hidden">
              <CgMenuGridO fontSize={25} className="text-blue-600" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={restourant.image}
                width={40}
                loading="lazy"
                className="rounded-full hidden sm:block"
              />
              <button
                className="p-2 rounded-lg font-semibold text-xs md:text-base border transition-colors border-blue-600 hover:bg-white  hover:text-blue-600 bg-blue-600 text-white"
                onClick={() => dispatch(userLogout())}
              >
                Logout
              </button>
            </div>
          </header>
          {loading && <Loading />}
          {children}
        </div>
      </div>
    </main>
  );
}
