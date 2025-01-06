import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Success() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  const getOrder = async () => {
    try {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      setOrder(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="container mx-auto mt-16 grid place-items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Success | Foody</title>
      </Helmet>
      <div className=" bg-[#80AF81] text-white  p-10  w-3/4 rounded-3xl flex flex-col justify-between gap-10">
        <div className="text-center">
          <h1>SUCCESS!</h1>
          <p className="text-xl md:text-3xl font-bold">
            Thank you for your order!
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-5">
          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-5">
              Order Details
            </h1>
            <div className="w-full flex items-start">
              <ul className="text-left space-y-2 text-sm md:text-base">
                <li>Order Number: {order.orderNumber}</li>
                <li>Order Date: {order.orderDate}</li>
                <li>Order Total: {order.total}</li>
              </ul>
            </div>
          </div>

          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-5">Orders</h1>
            <div className="border p-1 rounded-lg">
              {order &&
                order.cart?.map((item) => (
                  <div
                    key={item.id}
                    className="flex text-center items-center md:flex-row flex-col justify-between pe-5 py-1 text-xs md:text-base"
                  >
                    <p className="font-semibold">
                      {item.name} × {item.quantity}
                    </p>
                    <span className="font-deluis">{item.price} ₼</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-full grid place-items-center">
          <Link
            to={"/"}
            className="border rounded-md py-2 px-5 hover:bg-white hover:text-[#80AF81] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
