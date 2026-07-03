import {useState, useEffect} from 'react'
import {getFlag} from './crrencyFlag'


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
    <div className='flex flex-col text-neutral-200 gap-[4px] bg-neutral-600 rounded'>
      {currentData.map((currency)=>(
      <ul key={currency.code} className='flex flex-col gap-[4px] bg-neutral-600 text-neutral-200'>
        <li className='flex justify-between gap-[4px]'>
          {getFlag(currency.code) && (
          <img src={getFlag(currency.code)} alt={currency.code}/>
        )}
          {currency.base} {currency.code}</li>
      </ul>
    ))}                
  </div>
    )
}
