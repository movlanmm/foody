import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/lib/cartSlice";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const cart = useSelector((state) => state.cartSlice.cart);
  const user = useSelector((state) => state.userSlice.user);
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      info: "",
    },
    onSubmit: (values) => {
      addOrder();
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (cart.length <= 0) {
      navigate("/shop");
    }
  }, []);

  const addOrder = async () => {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...formik.values,
        total,
        cart,
        userID: user.id,
        orderNumber: Math.floor(1000 + Math.random() * 9000),
        orderDate: new Date().toLocaleDateString("tr-TR"),
        status: "Pending",
      });
      navigate(`/order/${docRef.id}`);
      formik.resetForm();
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Shop</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <Link to={"/shop"}>Shop</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full md:w-4/5 mt-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col md:flex-row gap-5"
        >
          {/* Form  start*/}
          <div className="w-full md:w-1/2 bg-[#f7f7f7] p-7 rounded-lg">
            <h1 className="font-bold text-4xl mb-6">Billing details</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 font-medium">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block mb-2 font-medium">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="company" className="block mb-2 font-medium">
                Company Name(optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="country" className="block mb-2 font-medium">
                Country / Region
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7"
                required
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
                value={formik.values.address}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                placeholder="Street address house number"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="city" className="block mb-2 font-medium">
                Town / City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="postcode" className="block mb-2 font-medium">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formik.values.postcode}
                onChange={formik.handleChange}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="border outline-none border-gray-300 rounded-full w-full py-3 px-7 mb-4 placeholder:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <h1 className="text-4xl font-bold my-5">
                Additional information
              </h1>
              <label htmlFor="info" className="block mb-2 font-medium">
                Order notes(optional)
              </label>
              <textarea
                name="info"
                id="info"
                value={formik.values.info}
                onChange={formik.handleChange}
                rows="4"
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="border rounded-3xl py-3 px-6 outline-none placeholder:text-sm w-full"
              ></textarea>
            </div>
          </div>
          {/* Form end */}

          <div className="w-full md:w-1/2 p-7">
            <h1 className="font-bold text-4xl mb-6">Your Order</h1>
            <div className="bg-black text-white font-bold text-xl py-2 px-5 rounded-full flex items-center justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            <ul className="px-5 divide-y">
              <div>
                <li className="">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between pe-5 py-3"
                    >
                      <p className="font-semibold">
                        {item.name} × {item.quantity}
                      </p>
                      <span className="font-deluis">{item.price} ₼</span>
                    </div>
                  ))}
                </li>
              </div>
              <li className="flex justify-between pe-5 py-4 text-lg">
                <p className="font-bold ">Subtotal</p>
                <span className="font-deluis text-main">{total} ₼</span>
              </li>
              <li className="flex justify-between pe-5 py-4 text-lg">
                <p className="font-bold text-lg">Total</p>
                <span className="font-deluis text-main">{total} ₼</span>
              </li>
            </ul>

            <div className="bg-[#f7f7f7] rounded-xl p-10 pt-8 mt-5">
              <p>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link className="text-main">privacy policy.</Link>
              </p>
              <div className="grid place-items-end">
                <button
                  type="submit"
                  className="border border-main rounded-full bg-main text-white font-bold px-7 py-3 hover:bg-white text-xs md:text-sm mt-5 hover:text-main transition-all duration-500"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
