import React, { useEffect, useState } from 'react'
import usePageTitle from './hooks/usePageTitle'
import CurrencyHistoryChart from './CurrencyHistoryChart'

export default function HistorySectionCard({ baseCurrency, baseReceiveCurrency }) {
  const [currentData, setCurrentData] = useState(null)

  usePageTitle('History')

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `https://currency-exchanger-app-backend.onrender.com/api?base=${encodeURIComponent(baseCurrency)}` || 'http://localhost:3000/api'
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log("Current Data:", data.currencies)
        setCurrentData(data.currencies?.find((c) => c.code === baseReceiveCurrency))

      } catch (error) {
        console.log("Error can't fetch api", error)
      }
   
    }
    fetchData()
  }, [baseCurrency, baseReceiveCurrency])

    if(!currentData) {
      return (
      <div className='md:flex-row flex flex-col md:justify-between gap-[16px]  md:items-center mt-4'>
        <div className='md:flex gap-[16px] grid grid-cols-2  w-full'>
          <div className='flex h-[81px] w-full flex-col gap-[16px] rounded-[16px] bg-[#202022] p-[12px] px-[20px] text-neutral-400 md:w-[140px]'></div>
          <div className='flex h-[81px] w-full flex-col gap-[16px] rounded-[16px] bg-[#202022] p-[12px] px-[20px] text-neutral-400 md:w-[140px]'></div>
          <div className='flex h-[81px] w-full flex-col gap-[16px] rounded-[16px] bg-[#202022] p-[12px] px-[20px] text-neutral-400 md:w-[140px]'></div>
          <div className='flex h-[81px] w-full flex-col gap-[16px] rounded-[16px] bg-[#202022] p-[12px] px-[20px] text-neutral-400 md:w-[140px]'></div>
        </div>
        <ul className='flex items-center justify-center gap-[28px] text-neutral-200 w-[286px] h-[42px] rounded-[8px] px-[10px] p-[2px] bg-[#202022]'></ul>
      </div>
      )
    }

  return (
    <div className='mt-4 w-full'>
      <div className='md:flex grid grid-cols-2 w-full gap-[12px] md:gap-[16px]'>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>OPEN</p>
          <span className='text-neutral-50'>{currentData?.rate}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>LAST</p>
          <span className='text-neutral-50'>{currentData?.last}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>CHANGE</p>
          <span className={currentData?.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}>{currentData?.percentageChange}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>% CHANGE</p>
          <span className={`${currentData?.percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>{currentData?.percentageChange}%</span>
        </div>
      </div>

      <CurrencyHistoryChart baseCurrency={baseCurrency} quoteCurrency={baseReceiveCurrency} />
    </div>
  )
}
