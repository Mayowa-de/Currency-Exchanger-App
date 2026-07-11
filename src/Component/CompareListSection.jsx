import { useState, useEffect } from 'react'
import { getFlag } from './currencyFlags'
import usePageTitle from './hooks/usePageTitle'
import StarIcon from '../assets/images/icon-star.svg'
import useFavorite  from './hooks/useFavorite'

export default function CompareListSection({ baseCurrency, options }) {
  const [currentData, setCurrentData] = useState([])
  const [currencyName, setCurrencyName] = useState({})

  const {addFavorite, removeFavorite, favoriteList} = useFavorite()
  usePageTitle('Compare')
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

  //currency name fetch directly from frankfurter api
  useEffect(() => {
    fetch('https://api.frankfurter.dev/v1/currencies')
      .then((res) => res.json())
      .then((data) => setCurrencyName(data))

  }, [])
  return (
    <div className='flex flex-col  gap-[2px] bg-neutral-800 rounded-[16px] border-none p-[8px] px-[8px] justify-center items-center'>
      <div className='flex gap-[12px] px-[10px] p-[8px]  justify-between w-full'>
        <div className='flex gap-[8px] text-[16px] '>
          <h1 className='text-neutral-500 text-[16px] '>MULTI-CURRENCY</h1>
          <h2 className='text-neutral-200'>1000</h2>
          <h2 className='text-neutral-200'>FROM</h2>
          <h3 className='text-neutral-200'>USD</h3>
        </div>
        <h3 className='text-neutral-500 text-[12px]'> 8 pairs</h3>
      </div>
      {currentData.slice(1, 9).map((currency) => (
        const pair = {baseCurrency, baseReceiveCurrency: currency.code}
        const favorited =isFavorite(pair.baseCurrency, pair.baseReceiveCurrency)

        return(
        <ul key={currency.code} className='flex flex-col justify-center gap-[4px] p-[2px] px-[8px] rounded w-full'>
          <li className='flex bg-neutral-900 border-neutral-600 border-[2px] focus:ring-[#CEF739] focus:ring-[2px] h-[61px] text-neutral-500 px-[16px] p-[10px] justify-between text-[18px] rounded-[10px] '>
            <div  role='button' className='flex gap-[10px] justify-center items-center'>
              {getFlag(currency.code) && (
                <img src={getFlag(currency.code)} className='w-[24px] h-[24px] border-none rounded ' alt={`${currency.code} flag`} />
              )}
              <div className='flex flex-col'>
                <span className='flex text-neutral-50'>{currency.code}</span>
                <span className='text-neutral-200'>{currencyName[currency.code]}</span>
              </div>
            </div>
            <div className='flex  gap-[6px]'>
              <div className='flex flex-col gap-[6px] items-center'>
              <span>{currency.rate}</span>
              <span className='text-[12px]'>@{currency.rate}</span>  
              </div>
              <button onClick={() =>(favorited ? removeFavorite(pair) : addFavorite(pair))}>
              <img src={StarIcon} alt='star icon' className='w-[12.53px] h-[12px]' />
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  )
}
