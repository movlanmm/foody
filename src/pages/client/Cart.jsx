import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import CartItem from "../../components/CartItem";
import { useSelector } from "react-redux";

export default function Cart() {
  const [updated, setUpdated] = useState(false);
  const [click, setClick] = useState(false);
  const cart = useSelector((state) => state.cartSlice.cart);
  const subtotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <main>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">CART</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <Link to={"/shop"}>Shop</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-7 gap-y-5 px-5 md:px-0 lg:gap-x-3 min-h-[50dvh]">
        {cart.length > 0 ? (
          <>
            <div className="w-full items-center justify-between bg-black text-white px-10 font-bold text-xl py-4 rounded-full hidden md:flex">
              <div className="">Product</div>
              <div className="min-w-[130px]">&nbsp;</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div className="">&nbsp;</div>
            </div>

            <div className="flex flex-col gap-5 mt-6">
              {cart.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  setUpdated={setUpdated}
                  click={click}
                  setClick={setClick}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-y-5 items-center justify-center sm:justify-between mt-10">
              <div className="flex flex-wrap gap-y-5 w-4/5 sm:w-fit">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border rounded-full py-3 px-7 mr-3 outline-none w-full sm:w-fit"
                />
                <button className="border border-main rounded-full bg-main text-white font-bold px-10 py-3 hover:bg-white text-sm w-full sm:w-fit hover:text-main transition-all duration-500">
                  APPLY COUPON
                </button>
              </div>

              <button
                disabled={!updated}
                onClick={() => setClick(true)}
                className={`border border-main rounded-full bg-main text-white font-bold px-10 py-3 hover:bg-white w-4/5 sm:w-fit text-sm hover:text-main transition-all duration-500 ${
                  !updated && "pointer-events-none opacity-50"
                }`}
              >
                UPDATE CART
              </button>
            </div>

            <div className="flex  justify-end mt-10">
              <div className="bg-[#f7f7f7] p-9 w-[450px] rounded-2xl space-y-6">
                <h2 className="font-bold text-2xl border-b pb-4 mb-6">
                  Cart Totals
                </h2>

                <ul>
                  <li className="flex justify-between items-center text-lg py-2">
                    <span>Subtotal</span>
                    <p className="font-deluis">{subtotal()} ₼</p>
                  </li>

                  <li className="flex justify-between items-center text-lg font-bold py-2">
                    <span>Total</span>
                    <p className="font-deluis">{subtotal()} ₼</p>
                  </li>
                </ul>

                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="border border-main rounded-full bg-main text-white text-xs font-bold px-10 py-3 w-full hover:bg-white hover:text-main transition-all duration-500 "
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-[50dvh]">
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <Link
              to={"/shop"}
              className="border border-main rounded-full bg-main text-white text-xs font-bold px-10 py-3 hover:bg-white hover:text-main transition-all duration-500 "
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
