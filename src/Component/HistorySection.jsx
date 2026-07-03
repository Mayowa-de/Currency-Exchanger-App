import React from 'react'
import ListHistoryButton from './ListHistoryButton'

export default function HistorySection({baseCurrency, baseReceiveCurrency, options}) {
  return (
    <div className='flex flex-col md:w-[1036px] px-[2px] w-full md:h-[540px] gap-[20px] '>
      <ListHistoryButton baseCurrency={baseCurrency} baseReceiveCurrency={baseReceiveCurrency} options={options}/>
    </div>
  )
}
