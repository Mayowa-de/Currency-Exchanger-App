import { useState, useEffect } from 'react'
import { getFlag } from './currencyFlags'
import usePageTitle from './hooks/usePageTitle'
import useFavorite from './hooks/useFavorite'
import StarIconFilled from '../assets/images/icon-star-filled.svg'
import { ChevronDown } from 'lucide-react'


export default function FavoritesSection({baseCurrency}) {
  const [currentData, setCurrentData] = useState([])
  const [currencyName, setCurrencyName] = useState({})
  const { favoriteList, removeFavorite } = useFavorite()

  usePageTitle('Favorites')
  // fetching currencies names directly from frankfurter api
  useEffect(() => {
    fetch('https://api.frankfurter.dev/v1/currencies')
      .then((res) => res.json())
      .then((data) => setCurrencyName(data))
  }, [])

    useEffect(() => {
      async function fetchData() {
        try {
          const apiUrl = `https://currency-exchanger-app-backend.onrender.com/api?base=${encodeURIComponent(baseCurrency)}` || 'http://localhost:3000/api'
          const response = await fetch(apiUrl)
          const data = await response.json()
  
          setCurrentData(
            data.currencies
          )
          console.log('currentData:', currentData)
        } catch (error) {
          console.log("Error can't fetch api", error)
        }
      }
      fetchData()
    }, [baseCurrency])

  if (favoriteList.length === 0) {
    return (
      <div className='flex flex-col gap-[2px] bg-neutral-800 rounded-[16px] border-none p-[8px] px-[8px] justify-center items-center'>
        <p className='text-neutral-500 text-[16px] p-[16px]'>
          No favorite pairs yet. Star a currency in Compare to add one.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-labelledby='favorites-heading'
      className='flex flex-col gap-[2px] bg-neutral-800 rounded-[16px] border-none p-[8px] px-[8px] justify-center items-center'
    >
      <div className='flex gap-[12px] px-[10px] p-[8px] justify-between w-full'>
        <h1 id='favorites-heading' className='text-neutral-500 text-[16px]'>
          FAVORITES
        </h1>
        <h3 className='text-neutral-500 text-[12px]'>
          {favoriteList.length} pair{favoriteList.length !== 1 ? 's' : ''}
        </h3>
      </div>

      <ul className='flex flex-col justify-center gap-[4px] p-[2px] px-[8px] rounded w-full'>
        {favoriteList.map((pair) => (
          <li
            key={`${pair.baseCurrency}-${pair.baseReceiveCurrency}`}
            className='flex bg-neutral-900 border-neutral-600 border-[2px] h-[61px] text-neutral-500 px-[16px] p-[10px] justify-between text-[18px] rounded-[10px]'
          >
            <div className='flex gap-[10px] justify-center items-center border-none'>
              {getFlag(pair.baseReceiveCurrency) && (
                <img
                  src={getFlag(pair.baseReceiveCurrency)}
                  className='w-[24px] h-[24px] border-none rounded'
                  alt={`${pair.baseReceiveCurrency} flag`}
                />
              )}
              <div className='flex '>
                <span className='flex text-neutral-50'>
                  {pair.baseCurrency} → {pair.baseReceiveCurrency}
                </span>
              </div>
            </div>
            <div className='flex  gap-[6px] justify-center items-center'>
              <div className='flex flex-col items-center'>
                <span className='text-[16px]'>
                  {currentData?.rate}
                </span>
             <span className={`${currentData?.percentChange > 0 ? 'text-green-500' : 'text-red-500 flex text-[10px]'} text-[12px]`}>
              {currentData?.percentChange?.toFixed(2)}
            </span>
            </div>
            <button
              onClick={() => removeFavorite(pair)}
              aria-label={`Remove ${pair.baseCurrency} to ${pair.baseReceiveCurrency} from favorites`}
              className='bg-neutral-900 w-full p-[8px] border-lime-500 border-[1px] rounded'
            >
              <img src={StarIconFilled} alt='' className='w-[16px] h-[16px]' />
            </button>

            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

