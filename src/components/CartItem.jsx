import React from "react";
import { IoIosClose } from "react-icons/io";
import { TiMinus, TiPlus } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../redux/lib/cartSlice";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export default function CartItem({ item, setUpdated, click, setClick }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    setQuantity(item.quantity);
  }, []);

  useEffect(() => {
    if (quantity !== item.quantity) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  }, [quantity]);

  useEffect(() => {
    if (click) {
      dispatch(updateCart({ ...item, quantity }));
      setUpdated(false);
      setClick(false);
    }
  }, [click]);

  const removeItemFromCart = () => {
    dispatch(removeFromCart(item.id));
    toast({
      title: `${item.name} removed from cart`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-between relative px-10 py-5 border rounded-2xl whitespace-nowrap">
        <div className="grid place-items-center">
          <img src={item.images[0]} width={80} />
        </div>
        <p className="text-lg font-bold w-[140px] text-center">{item.name}</p>
        <p className="text-center font-deluis text-lg font-semibold">
          {item.price} ₼
        </p>

        <div className="grid place-items-center">
          <div className="flex justify-between items-center rounded-full whitespace-nowrap w-[120px] bg-slate-100  py-3 px-4 text-base sm:text-xl font-bold">
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
        </div>

        <span className="text-center font-deluis text-lg w-[90px] font-semibold">
          {item.quantity * item.price} ₼
        </span>
        <button
          className="text-center absolute md:static top-4 right-4"
          onClick={onOpen}
        >
          <IoIosClose className="text-3xl border border-dashed rounded-full" />
        </button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Product
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => removeItemFromCart()}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </>
  );
}
