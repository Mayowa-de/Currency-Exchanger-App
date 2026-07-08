import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

export default function SliderSection({ baseCurrency }) {
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `https://currency-exchanger-app-backend.onrender.com/api?base=${encodeURIComponent(baseCurrency)}` || 'http://localhost:3000/api'
        const response = await fetch(apiUrl)
        const data = await response.json()

        setCurrentData(
          data.currencies?.map(currency => ({
            ...currency,
            base: data.base
          })) || []
        )
      } catch (error) {
        console.log("Error can't fetch api", error)
      }
    }
    fetchData()
  }, [baseCurrency])

  return (
    <section className='relative w-full h-[34px] md:h-[40px] items-center flex bg-[#171719] shadow-md overflow-hidden z-50'>
      <div className='relative z-10 md:px-[16px] px-[8px] p-[12px] md:p-[12px] bg-[#CEF739]'>
        <h1 className="text-black tracking-[2px] font-semibold text-[10px] md:text-[12px]">. LIVE MARKETS</h1>
      </div>

      <motion.div
        className="flex gap-[12px] z-0 absolute left-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {[...(currentData || []), ...(currentData || [])].map((currency, index) => (
          <div key={`${currency.code}-${index}`} className='flex flex-row gap-[8px] border-r border-r-white/20 px-[4px]'>
            <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold list-none'>
              {currency.base}/{currency.code}
            </li>
            <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold list-none'>
              {currency.rate}
            </li>
            <li className={`flex items-center justify-center text-[10px] md:text-[12px] tracking-[1px] font-semibold list-none 
              ${currency.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span className='w-[12px] h-[12px] flex items-center gap-[2px] justify-center px-[4px]' > {currency.percentageChange > 0 ? "\u25B2" : "\u25BC"}</span>
              {currency.percentageChange}%
            </li>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
