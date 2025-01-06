import React from 'react'
import { CircularProgress } from '@chakra-ui/react'

export default function Loading() {
  return (
    <div className='h-dvh w-full  bg-white/50 grid place-items-center fixed top-0 left-0 z-20'>
        <CircularProgress isIndeterminate color='#eaa53b' />
    </div>
  )
}
