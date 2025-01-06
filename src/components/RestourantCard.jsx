import React from 'react'
import { Link } from 'react-router-dom'

export default function RestourantCard({item}) {
  return (
    <div className='flex items-center justify-center px-2 h-[500px] rounded-xl'>
        <div className='w-full  bg-white rounded-3xl border shadow-sm h-full flex flex-col justify-between'>
              <div className='h-[50%] rounded-t-3xl' style={{backgroundImage:`url(${item.image})`,backgroundSize:'cover',backgroundPosition:'center'}}>
             </div>
              <div className='p-4 h-[50%] sm:p-6 flex flex-col justify-between'>
                <p className='font-bold text-gray-700 text-base md:text-lg leading-7 mb-1'>{item.name}</p>
                <p className='text-[#7C7C80] text-sm'><span className='text-black font-semibold'>Address:</span> {item.address}</p>
                <p className='text-[#7C7C80] text-sm'><span className='text-black font-semibold'>Phone:</span> {item.phone}</p>
                  <Link  to={`/restourant/${item.id}`}  className='block text-sm w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform text-white hover:text-main bg-main rounded-xl hover:bg-white border border-main'>
                      View
                  </Link>
              </div>
         </div>
    </div>
  )
}
