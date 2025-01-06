import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import { CiSearch, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";

import { useRef } from "react";
import { IoIosClose } from "react-icons/io";
import Headroom from "react-headroom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../redux/lib/cartSlice";
import { userLogout } from "../redux/lib/userSlice";

export default function Header() {
  const user = useSelector((state) => state.userSlice.user);
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();

  const subtotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <Headroom style={{ zIndex: 1000 }}>
      <header
        className={`justify-between bg-white items-center px-10 py-3 shadow-md  top-0 hidden lg:flex`}
      >
        <a href="#" className="logo">
          <img src="/public/images/logo.png" alt="logo" className="w-36" />
        </a>

        <div className="links">
          <ul className="flex gap-8 text-lg font-medium text-white cursor-pointer ">
            <li
              id="header-link"
              className={`transition-colors duration-200 hover:bg-main hover:text-white gap-3 text-black px-5 ${
                pathname === "/" && "active"
              }`}
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              id="header-link"
              className={`text-black hover:bg-main transition-colors duration-200 hover:text-white px-5 ${
                pathname === "/shop" && "active"
              }`}
            >
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li
              id="header-link"
              className={`flex items-center text-black overflow-hidden hover:overflow-visible hover:bg-main transition-colors duration-200 hover:text-white px-5 ${
                pathname.includes("register") && "active"
              }`}
            >
              Register <MdOutlineKeyboardArrowDown fontSize={17} />
              <div className="w-[250px] whitespace-nowrap p-4 gap-3 rounded-xl shadow-xl absolute top-[100%] flex text-black -left-1/2 bg-white flex-col">
                <Link
                  to={"/register"}
                  className="transition-colors hover:text-main"
                >
                  Register
                </Link>
                <Link
                  to={"/register-restourant"}
                  className="transition-colors hover:text-main"
                >
                  Register Restourant
                </Link>
              </div>
            </li>
            <li
              id="header-link"
              className={`text-black hover:bg-main transition-colors duration-200 hover:text-white px-5 ${
                pathname === "/about" && "active"
              }`}
            >
              <Link to={"/about"}>About</Link>
            </li>
            <li
              id="header-link"
              className={`text-black hover:bg-main transition-colors duration-200 hover:text-white px-5 overflow-hidden ${
                pathname === "/contact" && "active"
              }`}
            >
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          {user ? (
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
                <div className="w-full flex flex-col items-center justify-center gap-3">
                  <div className="border border-green-500 font-bold rounded-full py-3 px-5">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(userLogout()), dispatch(clearCart());
                    }}
                    className="border w-3/4 border-main py-1 px-4 rounded-xl text-sm font-semibold hover:bg-main hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                  <Link
                    to={"/orders"}
                    className="border w-3/4 text-center border-main py-1 px-4 rounded-xl text-sm font-semibold hover:bg-main hover:text-white transition-colors"
                  >
                    See Orders
                  </Link>
                </div>
              </MenuList>
            </Menu>
          ) : (
            <Link
              to="/login"
              className="border border-main py-3 px-6 rounded-full whitespace-nowrap leading-tight font-medium hover:bg-main hover:text-white"
            >
              Login
            </Link>
          )}
          <button
            ref={btnRef}
            onClick={onOpen}
            className="p-2 bg-main rounded-full text-white relative"
          >
            <GiShoppingCart fontSize={25} />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-2 text-main text-xs bg-white rounded-full shadow-2xl shadow-black p-1 px-2">
                {cart.length}
              </span>
            )}
          </button>
          <Link to={"/shop"} className="p-2 bg-main rounded-full text-white">
            <CiSearch fontSize={25} />
          </Link>
        </div>
      </header>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="rounded-xl mr-5 h-fit">
          <DrawerBody className="space-y-5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="w-fit flex items-center justify-between gap-2 relative"
                >
                  <img
                    src={item.images[0]}
                    alt="best_seller"
                    className="w-1/5 object-contain rounded-full"
                  />
                  <div className="space-y-1 flex-1">
                    <p className="text-lg font-bold">{item.name}</p>
                    <h4 className="text-sm text-main font-bold">
                      <span className="text-[#979797]">{item.quantity} x </span>
                      {item.price}
                    </h4>
                  </div>
                  <button
                    className="text-xl"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <IoIosClose />
                  </button>
                </div>
              ))
            ) : (
              <p className="font-bold w-full text-center p-2">
                Your cart is Empty!
              </p>
            )}
          </DrawerBody>

          <DrawerFooter className="flex flex-col">
            <p className="text-xl font-bold text-left w-full mb-2">
              Subtotal:<span className="text-main ml-4">£{subtotal()}</span>
            </p>
            <div className=" w-full flex justify-between gap-2">
              {cart.length > 0 && (
                <>
                  <Link
                    to={"/cart"}
                    onClick={onClose}
                    className="border flex-1 text-center border-main rounded-full bg-main text-white font-semibold text-sm tracking-wider py-2 hover:bg-white hover:text-main transition-all duration-500"
                  >
                    VIEW CART
                  </Link>
                  <Link
                    to={user ? "/checkout" : "/login"}
                    onClick={onClose}
                    className="border flex-1 text-center border-main rounded-full  py-2 hover:bg-main font-semibold text-sm tracking-wider hover:text-white transition-all duration-500"
                  >
                    CHECHOUT
                  </Link>
                </>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Headroom>
  );
}
