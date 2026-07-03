import {useState, useEffect} from 'react'
import {getFlag} from './crrencyFlags'


export default function CompareListSection({baseCurrency, options}){
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
    <div className='flex flex-col  gap-[4px] bg-neutral-600 rounded-full border-none '>
      {currentData.map((currency)=>(
      <ul key={currency.code} className='flex flex-col gap-[4px] bg-neutral-600 text-neutral-200 p-[12px] px-[8px] rounded'>
        <li className='flex items-center justify-center text-[28px] gap-[36px] p-[8px] px-[12px]'>
          {getFlag(currency.code) && (
          <img src={getFlag(currency.code)} className='w-[25px] h-[25px] border-none rounded' alt={currency.code}/>
        )}
          <span className='flex >{currency.base}</span>
          <span>{currency.code}</span></li>
      </ul>
    ))}                
  </div>
    )
}
