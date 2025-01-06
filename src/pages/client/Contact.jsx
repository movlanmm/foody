import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { GiPaperPlane } from "react-icons/gi";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact | Foody</title>
      </Helmet>
      <div className="relative h-[320px] bg-[url(/public/images/pagetitle-3.png)] bg-no-repeat bg-cover">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">Contact</h1>
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <MdKeyboardArrowRight />
            <span className="text-main">Contact</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-7 gap-y-5 px-5 md:px-0 lg:gap-x-3 grid grid-cols-1 md:grid-cols-2">
        <div className="w-full space-y-10">
          <h1 className="text-4xl font-bold ">Get in Touch</h1>
          <p className="text-[#616161] leading-relaxed">
            FoodMood is an ambitious multimedia effort founded in 2011 to
            examine how technology will change life in the future for a massive
            mainstream audience.Contact us today to find out how we can help
            you.
          </p>
          <ul className="space-y-10">
            <li className="flex gap-5 items-center">
              <CiLocationOn fontSize={45} className="text-main" />
              <div className="space-y-2">
                <p className="font-deluis font-bold text-black text-xl">
                  WE ARE HERE:
                </p>
                <p className="font-deluis text-sm text-[#616161]">
                  27 Division St, New York, NY 10002, USA
                </p>
              </div>
            </li>
            <li className="flex gap-5 items-center">
              <GiPaperPlane fontSize={40} className="text-main" />
              <div className="space-y-2">
                <p className="font-deluis font-bold text-black text-xl">
                  MAIL US:
                </p>
                <p className="font-deluis  text-sm text-[#616161]">
                  foodmood@mail.com
                </p>
              </div>
            </li>
            <li className="flex gap-5 items-center">
              <LiaPhoneVolumeSolid fontSize={40} className="text-main" />
              <div className="space-y-2">
                <p className="font-deluis font-bold text-black text-xl">
                  PHONE US:
                </p>
                <p className="font-deluis  text-sm text-[#616161]">
                  +8 (123) 578 98745
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-center bg-[url('/public/images/form-bg.png')] p-10 bg-no-repeat bg-cover lg:bg-contain bg-top items-center">
          <form className="w-full sm:w-4/5 lg:w-2/3 text-center space-y-4 h-full">
            <h1 className="text-white text-4xl font-bold">Leave a Reply</h1>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="py-3 rounded-full px-5 w-full"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="py-3 rounded-full px-5 w-full"
            />
            <textarea
              name="message"
              id="message"
              cols={4}
              rows={5}
              className="w-full rounded-3xl p-5"
              placeholder="Message..."
            ></textarea>
            <button className="bg-main text-white font-bold py-3 px-5 rounded-full">
              SEND A MESSAGE
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
