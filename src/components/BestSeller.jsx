import React from 'react'
import { FaStar } from "react-icons/fa";


export default function BestSeller({item}) {
  return (
    <div className='w-fit flex items-center gap-6'>
        <img src={item.images[0]} alt="best_seller" className='w-1/5 object-contain rounded-full' />
        <div className='space-y-1'>
            <span className='text-lg font-bold tracking-wide'>{item.name}</span>
            <div className='flex text-xs gap-1 text-main'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
            </div>
            <h4 className='text-sm text-main font-bold'>{item.price} ₼</h4>
        </div>
    </div>
  )
}
