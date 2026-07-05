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
          data.currencies
        )
      } catch (error) {
        console.log("Error can't fetch api", error)
      }
    }
    fetchData()
  }, [baseCurrency])
  return (
    <div className='flex flex-col  gap-[4px] bg-neutral-700 rounded border-none p-[8px] px-[8px] '>
      {currentData.map((currency)=>(
      <ul key={currency.code} className='flex flex-col gap-[4px] p-[12px] px-[8px] rounded'>
        <li className='flex items-center bg-neutral-900 border-neutral-600 border-[2px] text-neutral-500 px-[16px] p-[12px] justify-between text-[18px] gap-[20px] rounded-[10px] '>
          <div className='flex gap-[6px] items-center'>
          {getFlag(currency.code) && (
          <img src={getFlag(currency.code)} className='w-[15px] h-[15px] border-none rounded' alt={currency.code}/>
        )}
          <span className='flex text-neutral-50'>{currency.code}</span>
          </div>
          <div className='flex flex-col gap-[6px]'>
          <span>{currency.rate}</span>
          </div>
        </li>
      </ul>
    ))}                
  </div>
    )
}
