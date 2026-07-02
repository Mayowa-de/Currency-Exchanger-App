import {useState, useEffect} from 'react'


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
    <div className='flex gap-[4px]>
      {currentData.map((currency)=>(
      <ul key={currency.code} >
        <li>{currency}</li>
      </ul>
    )}                
  </div>
