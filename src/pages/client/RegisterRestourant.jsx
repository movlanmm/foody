import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Map from "../../components/Map";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loaded, loadingStart } from "../../redux/lib/loadingSlice";
import { Helmet } from "react-helmet";

export default function RegisterRestourant() {
  const user = useSelector((state) => state.userSlice.user);
  const [uploadImg, setUploadImg] = useState(null);
  const [url, setUrl] = useState(null);
  const [values, setValues] = useState(false);
  const [uid, setUid] = useState(null);
  const [position, setPosition] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loadingSlice.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      phone: "",
      info: "",
      hours: {
        from: "",
        to: "",
      },
      days: {
        from: "Monday",
        to: "Sunday",
      },
      image: "",
      lat: "",
      lng: "",
    },
    onSubmit: (values) => {
      setValues(values);
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
        setUid(uid);
        addUserToFirestore(uid, values);
        uploadFile();
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
        username: values.name,
        role: "Restourant",
      });
      await addRestourant(uid, values);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadFile = async () => {
    if (uploadImg === null) {
      return;
    }
    const imageRef = ref(storage, `images/${uuidv4()}`);

    uploadBytes(imageRef, uploadImg)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addRestourant = async (uid, values, url) => {
    dispatch(loadingStart());
    try {
      const docRef = await setDoc(doc(db, "restourants", uid), {
        ...values,
        image: url,
      });
      toast({
        position: "top",
        title: "Your restourant created successfully",
        description: "Congratulations",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(loaded());
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (position) {
      formik.setValues({
        ...formik.values,
        lat: position[0],
        lng: position[1],
      });
    }
  }, [position]);

  useEffect(() => {
    const { password, ...others } = values;
    if (url) {
      addRestourant(uid, others, url);
    }
  }, [url]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register Restourant</title>
      </Helmet>
      {loading && <Loading />}
      <main className={`${loading && "pointer-events-auto overflow-hidden"}`}>
        <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
            <h1 className="text-5xl font-bold">Shop</h1>
            <div className="flex gap-2 items-center font-semibold text-sm">
              <Link to={"/"}>Home</Link>
              <MdKeyboardArrowRight />
              <span className="text-main whitespace-nowrap">
                Restourant Registration
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto w-full md:w-4/5 px-2 mt-20">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex items-center justify-center gap-5"
          >
            {/* Form  start*/}
            <div className="w-full md:w-4/5 bg-[#f7f7f7] p-7 rounded-lg">
              <h1 className="font-bold text-4xl mb-6 text-center">
                Register Restourant
              </h1>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Restourant name
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
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                    required
                  />
                </div>
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

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="city" className="block mb-2 font-medium">
                  City/ Region
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-2 font-medium">
                  Street address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                  placeholder="Street number and name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="image" className="block mb-2 font-medium">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setUploadImg(e.target.files[0])}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                  placeholder="Street number and name"
                  required
                />
              </div>
              <div className="mb-6">
                <h1 className="text-4xl font-bold my-5">
                  Additional information
                </h1>
                <label htmlFor="info" className="block mb-2 font-medium">
                  Notes (optional)
                </label>
                <textarea
                  name="info"
                  id="info"
                  onChange={formik.handleChange}
                  value={formik.values.info}
                  rows="4"
                  placeholder="Notes about your restourant."
                  className="border rounded-3xl py-3 px-6 outline-none placeholder:text-sm w-full"
                ></textarea>
              </div>

              <h1 className="font-bold text-4xl mb-6 text-left">
                Opening Hours
              </h1>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="from" className="block mb-2 font-medium">
                    From
                  </label>
                  <input
                    type="time"
                    id="hours.from"
                    name="hours.from"
                    onChange={formik.handleChange}
                    value={formik.values.hours.from}
                    className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="hours.to" className="block mb-2 font-medium">
                    To
                  </label>
                  <input
                    type="time"
                    id="hours.to"
                    name="hours.to"
                    onChange={formik.handleChange}
                    value={formik.values.hours.to}
                    className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                    required
                  />
                </div>
              </div>

              <h1 className="font-bold text-4xl mb-6 text-left">
                Opening Days
              </h1>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="days.from" className="block mb-2 font-medium">
                    From
                  </label>
                  <select
                    id="days.from"
                    name="days.from"
                    onChange={formik.handleChange}
                    value={formik.values.days.from}
                    className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                    required
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday" defaultChecked>
                      Sunday
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="days.to" className="block mb-2 font-medium">
                    To
                  </label>
                  <select
                    id="days.to"
                    name="days.to"
                    onChange={formik.handleChange}
                    value={formik.values.days.to}
                    className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                    required
                  >
                    <option value="Monday" defaultChecked>
                      Monday
                    </option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
              </div>

              <div className="grid place-items-center h-[400px]">
                <Map position={position} setPosition={setPosition} />
              </div>

              <button className="border border-main rounded-full mt-4 px-10 py-3 bg-main text-white hover:bg-white hover:text-main transition-all duration-500">
                Register
              </button>
            </div>
            {/* Form end */}
          </form>
        </div>
      </main>
    </>
  );
}
