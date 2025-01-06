import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Map from "../../components/Map";
import { IoMdPin } from "react-icons/io";
import { MdLocalPhone, MdMailOutline } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Helmet } from "react-helmet";

export default function Login() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [restourant, setRestourant] = useState({});
  const [menu, setMenu] = useState([]);

  const getRestourant = async () => {
    try {
      const docRef = doc(db, "restourants", id);
      const docSnap = await getDoc(docRef);
      setRestourant(docSnap.data());
      setLocation([docSnap.data().lat, docSnap.data().lng]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMenu = async () => {
    try {
      const q = query(collection(db, "menu"), where("restourantID", "==", id));
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
  };

  useEffect(() => {
    getRestourant();
    getMenu();
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{restourant?.name}</title>
      </Helmet>
      <div
        className={`relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold text-center">{restourant.name}</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">{restourant.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row  gap-5 w-4/5 mt-20">
        <div className="lg:w-[60%] w-full">
          <img
            src={restourant.image}
            alt="restourant image"
            loading="lazy"
            className="rounded-xl mb-2 w-full h-[500px]"
          />
          <ul className="space-y-3">
            <li className="flex gap-2 items-center">
              <IoMdPin className="text-2xl text-main" />
              <h1 className="text-2xl font-bold w-full">
                {restourant.address}
              </h1>
            </li>
            <li className="flex gap-2 items-center">
              <MdLocalPhone className="text-2xl text-main" />
              <p className="font-bold">{restourant.phone}</p>
            </li>
            <li className="flex gap-2 items-center">
              <MdMailOutline className="text-2xl text-main" />
              <p className="text-gray-500">{restourant.email}</p>
            </li>
            <li className="flex flex-col gap-2">
              {days
                .slice(
                  days.indexOf(restourant.days?.from),
                  days.indexOf(restourant.days?.to) + 1
                )
                .map((d, i) => (
                  <div key={i} className="flex gap-2">
                    <p className="font-bold">{d}</p>
                    <span className="text-gray-400">
                      ----------------------
                    </span>
                    <span className="text-bold text-green-500">
                      {restourant.hours?.from} - {restourant.hours?.to}
                    </span>
                  </div>
                ))}
            </li>
          </ul>
        </div>
        <div className="lg:w-[40%] w-full h-[500px] z-0">
          {location && <Map location={location} />}
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-4/5 mt-20">
        <h1 className="col-span-3 text-center mb-6 text-4xl font-bold">Menu</h1>
        {menu.length > 0 ? (
          menu.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <div className="flex justify-center items-center h-[500px]">
            <h1 className="text-2xl font-bold">No Menu Found</h1>
          </div>
        )}
      </div>
    </main>
  );
}
