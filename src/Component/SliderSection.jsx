import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import chevronIcon from "../assets/images/icon-chevron-down.svg"

export default function SliderSection() {
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://currency-exchanger-app-backend.onrender.com/api");
        const data = await response.json()
        setCurrentData(
          data.currencies.map(currency => ({
            ...currency,
            base: data.base
          }))
        )
      } catch (error) {
        console.log("Error can't fetch api", error)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='relative w-full h-[34px] md:h-[40px] items-center flex bg-[#171719] shadow-md overflow-hidden'>
      
      {/* LIVE MARKETS label — sits on top via z-10 */}
      <div className='relative z-10 md:px-[16px] px-[8px] p-[12px] md:p-[12px] bg-[#CEF739]'>
        <h1 className="text-black tracking-[2px] font-semibold text-[10px] md:text-[12px]">. LIVE MARKETS</h1>
      </div>

      {/* Ticker — scrolls behind the label via z-0 */}
      <motion.div
        className="flex gap-[4px] z-0 absolute left-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...(currentData || []), ...(currentData || [])].map((currency, index) => (
          <div key={`${currency.code}-${index}`} className='flex flex-row gap-[12px] border-r-[2px] border-l-[2px]'>
            <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold'>
              {currency.base}/{currency.code}
            </li>
            <li className='text-[#FFFFFF] text-[10px] md:text-[12px] tracking-[1px] font-semibold'>
              {currency.rate}
            </li>
            <li className={`flex items-center gap-1 text-[10px] md:text-[12px] tracking-[1px] font-semibold 
              ${currency.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {/* rotate-180 = up (green), rotate-0 = down (red) */}
              <img
                src={chevronIcon}
                className={`transition-transform ${currency.percentageChange > 0 ? 'rotate-180' : 'rotate-0'}`}
              />
              {currency.percentageChange}%
            </li>
          </div>
        ))}
      </motion.div>
    </section>
  )
              }
