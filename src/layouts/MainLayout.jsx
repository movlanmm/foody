import React from "react";
import MobileHeader from "../components/MobileHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowUp } from "react-icons/io";
import ScrollToTop from "../components/ScrollToTop";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserCart } from "../redux/lib/cartSlice";
import { loaded, loadingStart } from "../redux/lib/loadingSlice";
import Splash from "../components/Splash";

export default function MainLayout({ children }) {
  const user = useSelector((state) => state.userSlice.user);
  const loading = useSelector((state) => state.loadingSlice.loading);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 250) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    if (user && user.role === "Restourant") {
      navigate("/restourant/dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "Customer") {
      updateUser();
    }
  }, [cart, user]);

  const updateUser = async () => {
    try {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, {
        cart,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.role === "Customer") {
      dispatch(getUserCart(user.cart));
    }
  }, [user]);

  useEffect(() => {
    dispatch(loadingStart());
    const timeout = setTimeout(() => {
      dispatch(loaded());
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <div>
          <ScrollToTop />
          <MobileHeader />
          <Header />
          {children}
          <Footer />
          {active && (
            <a
              href="#"
              className="bg-main block p-4 fixed right-5 bottom-5 rounded-full group shadow-lg text-white z-30"
            >
              <IoIosArrowUp
                className="group-hover:animate-bounce"
                fontSize={25}
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}
