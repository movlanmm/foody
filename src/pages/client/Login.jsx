import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { userLogged } from "../../redux/lib/userSlice";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function Login() {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onLogin();
    },
  });

  const onLogin = () => {
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(userLogged({ ...docSnap.data(), id: docSnap.id }));
        } else {
          console.log("No such document!");
        }
        toast({
          title: "Logged.",
          description: "Login is successfull.",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Something went wrong!",
          description: `${error.message}`,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Login</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Login</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full md:w-4/5 px-2  mt-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex items-center justify-center gap-5"
        >
          {/* Form  start*/}
          <div className="w-full md:w-1/2 bg-[#f7f7f7] p-7 rounded-lg">
            <h1 className="font-bold text-4xl text-center mb-6">Login</h1>
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
                className={`border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4  placeholder:text-sm ${
                  formik.errors.email && "border-red-500"
                }`}
                required
              />
            </div>

            <div className="mb-6">
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
                Don't you have a account?{" "}
                <Link to={"/register"} className="text-blue-600 font-bold">
                  Register
                </Link>
              </span>
            </div>

            <div className="grid place-items-center">
              <button
                type="submit"
                className="border border-main rounded-full text-main font-bold px-10 py-3 hover:bg-main hover:text-white transition-all duration-500 w-1/2"
              >
                Login
              </button>
            </div>
          </div>
          {/* Form end */}
        </form>
      </div>
    </main>
  );
}
