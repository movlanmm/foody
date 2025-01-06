import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import Headroom from "react-headroom";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Menu, MenuButton, MenuList, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/lib/userSlice";
import { clearCart } from "../redux/lib/cartSlice";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const asideRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const closeAside = (e) => {
    if (open && !asideRef.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  window.addEventListener("mousedown", closeAside);
  return (
    <Headroom style={{ zIndex: 1000 }}>
      <header className="px-5 py-3  flex justify-between items-center whitespace-nowrap text-white bg-black lg:hidden">
        <button onClick={() => setOpen(true)}>
          <RxHamburgerMenu fontSize={25} />
        </button>

        <div>
          <a href="#">
            <img src="/public/images/logo.png" alt="logo" width={100} />
          </a>
        </div>

        <div className="flex gap-3">
          <Menu>
            <MenuButton
              as={Button}
              style={{
                borderRadius: "50%",
                backgroundColor: "#eaa53b",
                padding: "8px",
              }}
            >
              <CiUser fontSize={25} color="#fff" />
            </MenuButton>
            <MenuList>
              {user ? (
                <div className="w-full flex flex-col items-center justify-center gap-3 relative">
                  <div className="border border-green-500 font-bold rounded-full text-black py-3 px-5">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(userLogout()), dispatch(clearCart());
                    }}
                    className="border w-3/4 border-main py-1 px-4 rounded-xl text-black text-sm font-semibold hover:bg-main hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                  <Link
                    to={"/orders"}
                    className="border w-3/4 text-center border-main py-1 px-4 rounded-xl text-black text-sm font-semibold hover:bg-main hover:text-white transition-colors"
                  >
                    See Orders
                  </Link>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-3">
                  <div className="border border-gray-500 font-bold rounded-full text-black py-3 px-4">
                    <CiUser fontSize={25} />
                  </div>
                  <Link
                    to={"/login"}
                    className="p-2 w-1/2 bg-main rounded-2xl text-center text-white"
                  >
                    Login
                  </Link>
                </div>
              )}
            </MenuList>
          </Menu>

          <Link
            to={"/cart"}
            className="p-2 bg-main rounded-full text-white relative"
          >
            <GiShoppingCart fontSize={25} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-main text-[8px] bg-white rounded-full shadow-2xl shadow-black p-1 px-2">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <aside
          ref={asideRef}
          className={`mobile-menu ${
            open ? "translate-x-0" : "-translate-x-full"
          } absolute h-dvh bg-black text-white left-0 top-0 w-3/4 py-6 px-5 overflow-scroll transition-all duration-300 z-40`}
        >
          <div className="flex justify-between mb-5">
            <img src="/public/images/logo.png" alt="logo" width={120} />
            <button onClick={() => setOpen(false)}>
              <IoClose fontSize={25} />
            </button>
          </div>
          <div className="links mt-10">
            <ul className="flex flex-col gap-8 font-bold text-xl font-mediu cursor-pointer w-fit">
              <li className=" hover:bg-main px-3 rounded-full">
                <Link to={"/"} onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li className=" hover:bg-main px-3 rounded-full">
                <Link to={"/shop"} onClick={() => setOpen(false)}>
                  Shop
                </Link>
              </li>
              {!user && (
                <>
                  <li className=" hover:bg-main px-3 rounded-full">
                    <Link to={"/register"} onClick={() => setOpen(false)}>
                      Register
                    </Link>
                  </li>
                  <li className=" hover:bg-main px-3 rounded-full">
                    <Link
                      to={"/register-restourant"}
                      onClick={() => setOpen(false)}
                    >
                      Register Restourant
                    </Link>
                  </li>
                </>
              )}
              <li className=" hover:bg-main px-3 rounded-full">
                <Link to={"/about"} onClick={() => setOpen(false)}>
                  About
                </Link>
              </li>
              <li className=" hover:bg-main px-3 rounded-full">
                <Link to={"/contact"} onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </header>
    </Headroom>
  );
}
