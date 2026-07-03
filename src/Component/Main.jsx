import React, {useState, useEffect} from 'react'
import FirstCardSection from './FirstCardSection'
import HistorySection from './HistorySection'

export default function Main({ baseSendCurrency, baseReceiveCurrency, setBaseSendCurrency, setBaseReceiveCurrency }) {
const [getCode, setgetCode] = useState([])
  
  useEffect(() =>{
  async function fetchCodeData() {
      try {
        const response = await fetch('https://currency-exchanger-app-backend.onrender.com/api' || 'http://localhost:3000/api')
        const data = await response.json()

        const currencyCode= data.currencies?.map((currency)=>currency.code) || []
        setgetCode(currencyCode)
      } catch (error) {
        console.log("Error can't fetch api", error)
      }
    }
    fetchCodeData()
  }, [])
  return (
    <div className='flex flex-col items-center justify-center  md:p-[48px] md:w-[1100px] md:h-[607px] w-full p-[30px] px-[10px]  md:px-[20px]'>
        <FirstCardSection baseSendCurrency={baseSendCurrency} baseReceiveCurrency={baseReceiveCurrency} setBaseReceiveCurrency={setBaseReceiveCurrency} setBaseSendCurrency={setBaseSendCurrency} options={getCode}  />
        <HistorySection baseCurrency={baseSendCurrency} baseReceiveCurrency={baseReceiveCurrency} options={getCode}/>
    </div>
  )
}
