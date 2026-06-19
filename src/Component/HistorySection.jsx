import React from 'react'
import ListHistoryButton from './ListHistoryButton'
import HistorySectionCard from './HistorySectionCard'

export default function HistorySection() {
  return (
    <div className='flex flex-col laptop:w-[1036px] laptop:h-[540px] gap-[20px] '>
      <ListHistoryButton/>
      <HistorySectionCard/>
    </div>
  )
}
