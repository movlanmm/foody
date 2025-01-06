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

export default function Restourants() {
  const [restourants, setRestourants] = useState([]);

  const getRestourants = async () => {
    await getDocs(collection(db, "restourants")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRestourants(newData);
    });
  };

  useEffect(() => {
    getRestourants();
  }, []);
  return (
    <div className="mb-10">
      <TableContainer className="w-full">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {restourants.length > 0 ? (
              restourants.map((user, i) => (
                <Tr key={i}>
                  <Td>
                    <img src={user.image} alt="" width={40} />
                  </Td>
                  <Td>{user.name}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.email}</Td>
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
