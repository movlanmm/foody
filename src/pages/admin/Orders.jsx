import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../utils/firebase";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await getDocs(collection(db, "orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(newData);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="mb-10">
      <TableContainer className="w-full">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Order Num</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.length > 0 ? (
              orders.map((user, i) => (
                <Tr key={i}>
                  <Td>{user.orderNumber}</Td>
                  <Td>{user.first_name}</Td>
                  <Td>{user.last_name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.orderDate}</Td>
                  <Td
                    className={`${
                      user.status === "Pending"
                        ? "text-yellow-300"
                        : "text-green-500"
                    } flex gap-2`}
                  >
                    {user.status}
                    <span className="relative flex h-3 w-3">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          user.status === "Pending"
                            ? "bg-yellow-300"
                            : "bg-green-500"
                        }`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${
                          user.status === "Pending"
                            ? "bg-yellow-300"
                            : "bg-green-500"
                        }`}
                      ></span>
                    </span>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <div className="text-center">No Restourants</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
