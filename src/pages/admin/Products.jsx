import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
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
import { CgArrowDown } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState();
  const [all, setAll] = useState();

  const pageCount = async () => {
    const coll = collection(db, "menu");
    const snapshot = await getCountFromServer(coll);
    setFilter(snapshot.data().count);
    setAll(snapshot.data().count);
  };

  const getProducts = async () => {
    const q = query(collection(db, "menu"), limit(filter));
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(newData);
    });
  };

  useEffect(() => {
    getProducts();
    pageCount();
  }, []);

  useEffect(() => {
    getProducts();
  }, [filter]);

  return (
    <div className="mb-10">
      <div className="p-1 rounded-xl border border-slate-300 w-fit flex items-center justify-between mb-4">
        <select
          className="outline-none text-center p-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value={all}>All</option>
          <option value={5}>See 5</option>
          <option value={10}>See 10</option>
        </select>
        <IoIosArrowDown />
      </div>
      <TableContainer className="w-full">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Calories</Th>
              <Th>Portion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.length > 0 ? (
              products.map((user, i) => (
                <Tr key={i}>
                  <Td>
                    <img src={user.images[0]} alt="" width={40} />
                  </Td>
                  <Td>{user.name}</Td>
                  <Td>{user.price} ₼</Td>
                  <Td>{user.calories} kj</Td>
                  <Td>{user.portion} g</Td>
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
