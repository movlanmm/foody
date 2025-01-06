import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../redux/lib/cartSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default function ProductCard({ item }) {
  const [added, setAdded] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);

  useEffect(() => {
    if (cart.find((i) => i.id === item.id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [cart]);

  const addToCart = () => {
    dispatch(addCart({ ...item, quantity: 1 }));
    toast({
      title: `${item.name} added to cart`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <div className="group w-full h-[500px] relative hover:border-dashed hover:border-2 px-1 py-4 border-2 border-transparent hover:rounded-2xl hover:border-main text-center space-y-8">
      <Link to={`/product/${item.id}`} className="h-full block">
        <div className="relative p-2 h-[50%] w-full overflow-hidden">
          <img
            src={item.images[0]}
            alt="prod"
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
          <img
            src={item.images[1]}
            alt="prod"
            loading="lazy"
            className="absolute top-0 left-0 group-hover:opacity-100 opacity-0 rounded-2xl transition-all duration-700 p-2 object-cover w-full h-full"
          />
        </div>

        <div className="flex h-[50%] py-5 flex-col justify-between">
          <span className="font-bold text-lg">{item.name}</span>

          <p className="text-base text-[#616161] font-thin h-[50px] overflow-clip">
            {item.info}
          </p>

          <h4 className="font-bold text-main text-2xl">{item.price} ₼</h4>
        </div>
      </Link>

      {added ? (
        <Link
          to={"/cart"}
          className="bg-main py-2 px-7 text-white rounded-tl-full rounded-br-full absolute -bottom-4 right-1/2 translate-x-1/2 hidden group-hover:block"
        >
          View Cart
        </Link>
      ) : (
        <button
          onClick={() => addToCart()}
          className="bg-main py-2 px-7 text-white rounded-tl-full rounded-br-full absolute -bottom-4 right-1/2 translate-x-1/2 hidden group-hover:block"
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
