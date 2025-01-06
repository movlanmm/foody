import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

export default function Register() {
  const user = useSelector((state) => state.userSlice.user);
  const toast = useToast();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const schema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  const registerUser = async (values) => {
    await createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        addUserToFirestore(uid, values);
        toast({
          position: "top",
          title: "Account created successfully",
          description: "Please login to continue.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const addUserToFirestore = async (uid, values) => {
    try {
      const docRef = await setDoc(doc(db, "users", uid), {
        email: values.email,
        username: values.username,
        role: "Customer",
        cart: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Register</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Register</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full md:w-4/5 px-2 mt-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex items-center justify-center gap-5"
        >
          {/* Form  start*/}
          <div className="w-full md:w-1/2 bg-[#f7f7f7] p-7 rounded-lg">
            <h1 className="font-bold text-4xl text-center mb-6">Register</h1>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 font-medium">
                Username
              </label>
              <input
                type="name"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <div className="relative h-fit mb-10">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={`border outline-none border-gray-300 rounded-full w-full py-3 px-7 placeholder:text-sm ${
                    formik.errors.email && "border-red-500"
                  }`}
                  required
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 right-3 text-xl"
                >
                  {showPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            <div className="mb-6 ps-2">
              <span className="text-sm">
                Do you have a account?{" "}
                <Link to={"/login"} className="text-blue-600 font-bold">
                  Login
                </Link>
              </span>
            </div>

            <div className="grid place-items-center">
              <button
                type="submit"
                className="border border-main rounded-full text-main font-bold px-10 py-3 hover:bg-main hover:text-white transition-all duration-500 w-1/2"
              >
                Register
              </button>
            </div>
          </div>
          {/* Form end */}
        </form>
      </div>
    </main>
  );
}
