import React, {useState, useEffect} from 'react'

export default function HistorySectionCard({baseCurrency}) {
  const [isActiveDate, setisActiveDate] = useState("1M");

  const listDate =['1D','1W', '1M', '1Y', '5Y'];
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
    <div className='md:flex-row flex flex-col md:justify-between gap-[16px]  md:items-center'>
      <div className='md:flex gap-[16px] grid grid-cols-2  w-full'>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
            <p>OPEN</p>
            <span className='text-neutral-50'>{currency.rate}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
            <p>LAST</p>
            <span className='text-neutral-50'>0.8530</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
            <p>CHANGE</p>
            <span className='text-green-500'>+0.0014</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
            <p>% CHANGE</p>
            <span className='text-green-500'>{currency.percentageChange}%</span>
        </div>
      </div>

      <ul className='flex items-center justify-center gap-[28px] text-neutral-200 w-[286px] h-[42px] rounded-[8px] px-[10px] p-[2px] bg-[#202022]'>
        {listDate.map(tabDate =>(
         <li key={tabDate} className={`flex ${isActiveDate === tabDate ? 'flex items-center justify-center bg-neutral-500 w-[47px] h-[38px] rounded-[8px]' : 'bg-transparent '}`} role='button' onClick={()=>setisActiveDate(tabDate)}>{tabDate}</li>
        ))}
      </ul>
    </div>
  )
}
