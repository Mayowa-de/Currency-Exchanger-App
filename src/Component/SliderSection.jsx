import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import chevronIcon from "../assets/images/icon-chevron-down.svg"

export default function SliderSection() {
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://currency-exchanger-app-backend.onrender.com/api");
        const data = await response.json()
        console.log(data)
        setCurrentData(Array.isArray(data) ? data : Object.values(data))
      } catch (error) {
        console.log("Error can't fetch api", error)
      }
    }
    fetchData()
  }, [])
  return (
      <section className='w-full h-[34px] md:h-[40px] items-center flex bg-[#171719] shadow-md '>
        <div className='relative md:px-[16px] px-[8px]  p-[12px] md:p-[12px] bg-[#CEF739]'>
          <h1 className="text-black z-1 items-center tracking-[2px] font-semibold text-[10px] md:text-[12px]">. LIVE MARKETS</h1>
        </div>
          <motion.div
          className="flex gap-[4px] overflow-hidden -z-1 absolute"
         animate={{x: ["100%", "-100%"],}}
         transition={{duration: 20, repeat: Infinity, ease: "linear",}}>
        {[...(currentData || []), ...(currentData || [])].map((currency, index) => (
          <div key={`${currency.code}-${index}`} className='flex flex-row gap-[16px] '>
          <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold'>{currency.base}/{currency.code}</li>
            <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold'>{currency.rate}</li>
          <li className={`text-[10px] md:text-[12px] tracking-[1px] flex items-center font-semibold ${currency.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}><img src={chevronIcon}/> {currency.percentageChange}%</li>
            </div>
         ))}
          </motion.div>
      </section>
  )
}
