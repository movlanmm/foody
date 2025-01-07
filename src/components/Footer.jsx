import React from 'react'
import { CiFacebook, CiLocationOn, CiTwitter } from 'react-icons/ci'
import { FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa'
import { MdLocalPhone,MdMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <div className="bg-[url(/public/images/footer-pizza_bg.png)] h-dvh bg-no-repeat bg-center flex flex-col gap-6 items-center justify-center px-3 md:px-0">
              <img src="/images/logo.png" alt="logo" width={200} />
              <ul className='container flex justify-between flex-wrap gap-y-4 text-sm md:text-base'>
                <li className='flex gap-2 items-center'>
                  <p className='bg-main p-3 rounded-full text-white'><CiLocationOn fontSize={25} /></p>
                  <span className='font-bold'>27 Division St, NY 10002, USA</span>
                </li>
                <li className='flex gap-2 items-center'>
                  <p className='bg-main p-3 rounded-full text-white'><MdLocalPhone fontSize={25} /></p>
                  <span className='font-bold'>+ 8 (123) 578 987 455</span>
                </li>
                <li className='flex gap-2 items-center overflow-hidden'>
                  <p className='bg-main p-3 rounded-full text-white'><MdMailOutline fontSize={25} /></p>
                  <span className='font-bold'>foodmood@webgeniuslab.com</span>
                </li>
              </ul>
        </div>

        <div className='shadow-2xl p-6 '>
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
                <p className='flex-1 text-sm font-thin'>Copyright © 2019 FoodMood by <Link to="/" className='text-main'>WebGeniusLab</Link>. All Rights Reserved.</p>

                <div className='flex text-xl sm:text-2xl gap-3 cursor-pointer'>
                            <CiTwitter className='hover:text-main'/>
                            <CiFacebook className='hover:text-main'/>
                            <FaTelegramPlane className='hover:text-main' />
                            <FaLinkedinIn  className='hover:text-main' />
                </div>
            </div>
        </div>
      </footer>
  )
}
