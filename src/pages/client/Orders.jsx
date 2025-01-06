import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const q = query(collection(db, "orders"), where("userID", "==", user.id));
      const querySnapshot = await getDocs(q).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(newData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Orders</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Orders</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-7 gap-y-5 px-5 md:px-0 lg:gap-x-3 min-h-[50dvh]">
        <>
          <TableContainer className="w-full">
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Order Number</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Total</Th>
                  <Th>Email</Th>
                  <Th className="bg-green-600">View Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.length > 0 ? (
                  orders.map((item, i) => (
                    <Tr key={i}>
                      <Td>{item.orderNumber}</Td>
                      <Td>{item.orderDate}</Td>
                      <Td
                        className={`${
                          item.status === "Pending"
                            ? "text-purple-500"
                            : "text-green-500"
                        } flex gap-2 font-bold`}
                      >
                        {item.status}
                        <span className="relative flex h-3 w-3">
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                              item.status === "Pending"
                                ? "bg-purple-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-3 w-3 ${
                              item.status === "Pending"
                                ? "bg-purple-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                        </span>
                      </Td>
                      <Td>{item.total} ₼</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        <button
                          onClick={() => navigate(`/order/${item.id}`)}
                          className="text-green-600 font-bold"
                        >
                          View Details
                        </button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7}>
                      <div className="text-center">No Orders</div>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      </div>
    </main>
  );
}
