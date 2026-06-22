import React from 'react'
import FirstCardSection from './FirstCardSection'
import HistorySection from './HistorySection'

export default function Main() {
  return (
    <div className='flex flex-col items-center justify-center md:px-[32px] md:p-[48px] md:w-[1100px] md:h-[607px] w-full p-[30px] px-[10px]  md:px-[20px]'>
        <FirstCardSection/>
        <HistorySection/>
    </div>
  )
}
