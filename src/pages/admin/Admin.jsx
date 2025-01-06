import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../utils/firebase";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="">
      <TableContainer className="w-full">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <Tr key={i}>
                  <Td>{user.username}</Td>
                  <Td
                    className={`${
                      user.role == "Customer"
                        ? "text-red-500"
                        : user.role == "Admin"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {user.role}
                  </Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <div className="text-center">No Users</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
