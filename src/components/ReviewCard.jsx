import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function ReviewCard() {
  return (
    <div className='w-full flex gap-4 items-start pt-4'>
        <img src="/public/images/person.jpeg" alt="person" className='w-[7%] object-contain rounded-xl' />
        <div className='text-left'>
            <div className='mb-1 flex items-center gap-2'>
                <h4 className='font-bold text-lg'>David Parker</h4>
                <div className='flex text-xs gap-1 text-main'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
               </div>
            </div>
            <p className='text-xs text-[#c4c4c4] mb-5'>SEPTEMBER 18, 2019</p>
            <p className='text-base text-[#616161] font-sans tracking-wide leading-relaxed'>This is a useful post for finding broken links within the website, what about links pointing outwards that are broken? I can use a free web service but wondered if this was possible.</p>
        </div>
    </div>
  )
}
