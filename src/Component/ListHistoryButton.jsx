import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import HistorySectionCard from './HistorySectionCard.jsx'

export default function ListHistoryButton() {
  const [isActive, setisActive] = useState("HISTORY")
  const [isOpenList, setIsOpenList] = useState(false)
  const dropdownRef = useRef(null)

  const ListTitle = ['HISTORY', 'COMPARE', 'FAVORITES', 'LOG']

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpenList(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className='laptop:w-[1036px] laptop:gap-[20px] mt-2'>
      {/* Desktop tabs */}
      <ul className='md:flex hidden gap-[8px] text-[#FFFF]'>
        {ListTitle.map((tab) => (
          <div className='flex flex-col gap-[4px]' key={tab} onClick={() => setisActive(tab)} role='button'>
            <li className='p-[8px] text-[16px]'>{tab}</li>
            <hr className={isActive === tab ? 'border-lime-500' : 'border-none'} />
          </div>
        ))}
      </ul>
      <hr className='border-neutral-600 md:flex hidden' />

      {/* Mobile custom dropdown */}
      <div ref={dropdownRef} className='relative md:hidden w-full'>
        <ul
          onClick={() => setIsOpenList(!isOpenList)}
          className='flex items-center justify-between w-full h-[40px] px-[12px] text-white bg-neutral-900 border border-neutral-400 rounded cursor-pointer'
        >
          <li>{isActive}</li>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpenList ? 'rotate-180' : 'rotate-0'}`}
          />
        </ul>

        {isOpenList && (
          <ul className='absolute top-full left-0 w-full bg-neutral-900 border border-neutral-400 border-t-0 rounded-b z-50'>
            {ListTitle.map((tab) => (
              <li
                key={tab}
                onClick={() => {
                  setisActive(tab)
                  setIsOpenList(false)
                }}
                className={`px-[12px] py-[10px] cursor-pointer text-[14px] hover:bg-neutral-800 ${
                  isActive === tab ? 'text-lime-500' : 'text-white'
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* ListHistoryCard Display */}
      {isActive === 'HISTORY' ? (
        <HistorySectionCard/>
      ) : (
      <p>No History Card Available </p>
      )}
    </div>
  )
}
