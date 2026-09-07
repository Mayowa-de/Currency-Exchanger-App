import React from 'react'
import ListsButton from './ListButtons'


export default function HistorySection({ baseCurrency, baseReceiveCurrency, options }) {

  return (
    <div className='flex w-full flex-col gap-[20px] px-[2px] md:w-[1036px]'>
      <ListsButton baseCurrency={baseCurrency} baseReceiveCurrency={baseReceiveCurrency} options={options} />
    </div>
  )
}
