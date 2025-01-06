import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
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
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { loaded, loadingStart } from "../../redux/lib/loadingSlice";

export default function Restourant() {
  const user = useSelector((state) => state.userSlice.user);
  const toast = useToast();
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMenu = async () => {
    dispatch(loadingStart());
    try {
      const q = query(
        collection(db, "menu"),
        where("restourantID", "==", user.id)
      );
      const querySnapshot = await getDocs(q).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMenu(newData);
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(loaded());
  };

  const deleteProduct = async (id) => {
    dispatch(loadingStart());
    try {
      const docRef = doc(db, "menu", id);
      await deleteDoc(docRef);
      toast({
        position: "top",
        title: "Product Deleted",
        description: "Thank you",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      getMenu();
    } catch (error) {
      console.log(error);
    }
    dispatch(loaded());
  };

  const deleteImagesFromStorage = (item) => {
    item.images.map(async (image) => {
      const imageRef = ref(storage, image);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-base md:text-xl text-black font-bold">
          Products Table
        </h1>
        <Link
          to={"/restourant/dashboard/add-product"}
          className="bg-blue-600 p-2 rounded-lg text-white text-xs whitespace-nowrap md:text-base font-semibold hover:bg-blue-700"
        >
          Add Product
        </Link>
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
              <Th className="bg-red-500">Delete</Th>
              <Th className="bg-green-600">Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {menu.length > 0 ? (
              menu.map((item, i) => (
                <Tr key={i}>
                  <Td>
                    <div className="w-[60px] h-[40px] relative overflow-hidden rounded-2xl">
                      <img
                        src={item.images[0]}
                        alt="img"
                        loading="lazy"
                        className="object-contain object-center absolute top-0 left-0 "
                      />
                    </div>
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>{item.price} ₼</Td>
                  <Td>{item.calories} kj</Td>
                  <Td>{item.portion} g</Td>
                  <Td>
                    <button
                      onClick={() => {
                        deleteProduct(item.id), deleteImagesFromStorage(item);
                      }}
                      className="text-red-500 font-bold"
                    >
                      Delete
                    </button>
                  </Td>
                  <Td>
                    <button
                      onClick={() =>
                        navigate(
                          `/restourant/dashboard/edit-product/${item.id}`
                        )
                      }
                      className="text-green-600 font-bold"
                    >
                      Edit
                    </button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <div className="text-center">No Products</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
