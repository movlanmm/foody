import { useFormik } from "formik";
import React from "react";
import Dropzone from "../../components/Dropzone";
import { useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import { loaded, loadingStart } from "../../redux/lib/loadingSlice";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const user = useSelector((state) => state.userSlice.user);
  const loading = useSelector((state) => state.loadingSlice.loading);
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedImages, setSelectedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [values, setValues] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      tags: "",
      info: "",
      categories: "",
      sku: "",
      portion: 0,
      calories: 0,
      images: [],
    },
    onSubmit: (values) => {
      setValues(values);
      uploadImages();
    },
  });

  const uploadImages = () => {
    dispatch(loadingStart());
    if (!selectedImages.length) {
      return;
    }
    const promises = [];
    selectedImages.forEach((file) => {
      const storageRef = ref(
        storage,
        `images/products/${uuidv4() + file.fayl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file.fayl);
      promises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(progress);
            },
            (error) => {
              console.error(error);
              toast({
                position: "top",
                title: "Error",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                resolve(downloadURL);
              } catch (error) {
                console.error(error);
                reject(error);
              }
            }
          );
        })
      );
    });

    Promise.all(promises)
      .then((downloadURLs) => {
        setUrls((prevURLs) => [...downloadURLs, ...prevURLs]);
        setProgress(100);
      })
      .catch((error) => console.log(error));
  };

  const addProduct = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "menu"), {
        ...values,
        images: urls,
        restourantID: user.id,
      });
      dispatch(loaded());
      toast({
        position: "top",
        title: "Product Added",
        description: "Thank you",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setProgress(0);
      formik.resetForm();
      setSelectedImages(null);
      setUrls([]);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } catch (error) {
      console.log(error.message);
      toast({
        position: "top",
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (progress === 100) {
      addProduct(values);
    }
  }, [progress]);

  return (
    <>
      <div
        className={`${
          loading && "pointer-events-none overflow-hidden"
        } container mx-auto w-full lg:w-4/5 mb-10`}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex items-center justify-center gap-5"
        >
          {/* Form  start*/}
          <div className="w-full md:w-4/5 bg-[#f7f7f7] p-7 rounded-lg">
            <h1 className="font-bold text-xl md:text-4xl mb-6 text-center">
              Add Product
            </h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Product name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="info" className="block mb-2 font-medium">
                Description
              </label>
              <textarea
                required
                name="info"
                id="info"
                onChange={formik.handleChange}
                value={formik.values.info}
                rows="4"
                placeholder="Notes about your product."
                className="border rounded-3xl py-3 px-6 outline-none placeholder:text-sm w-full"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="categories" className="block mb-2 font-medium">
                Categories
              </label>
              <input
                type="categories"
                id="categories"
                name="categories"
                onChange={formik.handleChange}
                value={formik.values.categories}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="tags" className="block mb-2 font-medium">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                onChange={formik.handleChange}
                value={formik.values.tags}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="sku" className="block mb-2 font-medium">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                onChange={formik.handleChange}
                value={formik.values.sku}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="portion" className="block mb-2 font-medium">
                Portion Size (g)
              </label>
              <input
                type="number"
                id="portion"
                name="portion"
                onChange={formik.handleChange}
                value={formik.values.portion}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                placeholder="Portion Size"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="calories" className="block mb-2 font-medium">
                Calories (kj)
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                onChange={formik.handleChange}
                value={formik.values.calories}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                placeholder="Portion Size"
                required
              />
            </div>
            {/* <div className="mb-6">
                     <label htmlFor="image" className="block mb-2 font-medium">Image</label>
                     <input type="file" id="image" multiple accept="image/*" onChange={(e)=> setUploadImg(e.target.files[0])}  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm" placeholder='Street number and name'  required/>
                </div>  */}
            <div className="mb-6">
              <Dropzone
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </div>
            <button
              type="submit"
              className="border border-blue-600 rounded-full mt-4 px-10 py-3 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all duration-500"
            >
              Add Product
            </button>
          </div>
          {/* Form end */}
        </form>
      </div>
    </>
  );
}
