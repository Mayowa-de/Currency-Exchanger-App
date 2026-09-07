import React, { useEffect, useState } from 'react'
import usePageTitle from './hooks/usePageTitle'
import CurrencyHistoryChart from './CurrencyHistoryChart'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

export default function HistorySectionCard({ baseCurrency, baseReceiveCurrency }) {
  const [currentData, setCurrentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  usePageTitle('History')

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setFetchError('')
      setCurrentData(null)
      try {
        const apiUrl = `https://currency-exchanger-app-backend.onrender.com/api?base=${encodeURIComponent(baseCurrency)}` || 'http://localhost:3000/api'
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error('Unable to load history data')
        }
        const data = await response.json()
        setCurrentData(data.currencies?.find((c) => c.code === baseReceiveCurrency))

      } catch (error) {
        setFetchError('History data is temporarily unavailable.')
      } finally {
        setIsLoading(false)
      }
   
    }
    fetchData()
  }, [baseCurrency, baseReceiveCurrency])

    if (isLoading) {
      return (
      <div className='mt-4 rounded-[16px] bg-[#202022] p-[20px] text-center text-[12px] text-neutral-500'>
        Loading rate data...
      </div>
      )
    }

    if (fetchError) {
      return <div className='mt-4 rounded-[16px] bg-[#202022] p-[20px] text-center text-[12px] text-red-300'>{fetchError}</div>
    }

    if (!currentData) {
      return <div className='mt-4 rounded-[16px] bg-[#202022] p-[20px] text-center text-[12px] text-neutral-500'>No rate data found for {baseCurrency} / {baseReceiveCurrency}.</div>
    }

    const rate = Number(currentData.rate)
    const percentageChange = Number(currentData.percentageChange)
    const openRate = Number(currentData.open ?? rate)
    const lastRate = Number(currentData.last ?? rate)
    const absoluteChange = Number.isFinite(Number(currentData.change))
      ? Number(currentData.change)
      : rate * (percentageChange / 100)
    const changeIsPositive = absoluteChange >= 0
    const ChangeIcon = percentageChange > 0 ? ArrowUp : percentageChange < 0 ? ArrowDown : Minus

  return (
    <div className='mt-4 w-full'>
      <div className='md:flex grid grid-cols-2 w-full gap-[12px] md:gap-[16px]'>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>OPEN</p>
          <span className='text-neutral-50'>{Number.isFinite(openRate) ? openRate : '--'}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>LAST</p>
          <span className='text-neutral-50'>{Number.isFinite(lastRate) ? lastRate : '--'}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>CHANGE</p>
          <span className={changeIsPositive ? 'text-green-500' : 'text-red-500'}>{Number.isFinite(absoluteChange) ? absoluteChange.toFixed(4) : '--'}</span>
        </div>
        <div className='flex flex-col gap-[16px] text-neutral-400 md:w-[140px] w-full h-[81px] px-[20px] p-[12px] rounded-[16px] bg-[#202022]'>
          <p>% CHANGE</p>
          <span className={`flex items-center gap-[4px] ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <ChangeIcon size={14} strokeWidth={2.5} aria-hidden='true' />
            {Number.isFinite(percentageChange) ? `${percentageChange}%` : '--'}
          </span>
        </div>
      </div>

      <CurrencyHistoryChart baseCurrency={baseCurrency} quoteCurrency={baseReceiveCurrency} />
    </div>
  )
}
