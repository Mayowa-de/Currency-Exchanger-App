import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import HistorySectionCard from './HistorySection'
import CompareListSection from './CompareListSection'
import FavoriteSection from './FavoriteSection'
import LogSection from './LogSection'
import useFavorite from './hooks/useFavorite'

export default function ListHistoryButton({ baseCurrency, options, baseReceiveCurrency }) {
  const [isActive, setisActive] = useState("HISTORY")
  const [isOpenList, setIsOpenList] = useState(false)
  const dropdownRef = useRef(null)
  const {favoriteList}  = useFavorite()
  

  const ListTitle = ['HISTORY', 'COMPARE', 'FAVORITES', 'LOG']

  const tabContent = {
    HISTORY: (
      <HistorySectionCard baseCurrency={baseCurrency} baseReceiveCurrency={baseReceiveCurrency} />

    ),
    COMPARE: (
      <CompareListSection baseCurrency={baseCurrency} baseReceiveCurrency={baseReceiveCurrency} options={options} />
    ),
    FAVORITES: (
      <FavoriteSection />
    ),
    LOG: (
      <LogSection />
    )
  }

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
    <div className='laptop:w-[1036px] laptop:gap-[20px] mt-2 flex flex-col gap-[8px]'>
      {/* Desktop tabs */}
      <ul className='md:flex hidden gap-[8px] text-[#FFFF]'>
        {ListTitle.map((tab) => (
          <div className='flex flex-col gap-[4px]' key={tab} onClick={() => setisActive(tab)} role='button'>
            <li className='flex gap-1 p-[8px] text-[16px] focus:ring-[2px] focus:ring-[#CEF739]'>{tab}
            </li>
            <hr className={isActive === tab ? 'border-lime-500' : 'border-none'} />
          </div>
        ))}
      </ul>
      <hr className='border-neutral-600 md:flex hidden' />

      {/* Mobile custom dropdown */}
      <div ref={dropdownRef} className='relative md:hidden w-full'>
        <ul
          onClick={() => setIsOpenList(!isOpenList)}
          className='flex items-center justify-between w-full h-[40px] px-[12px] text-white bg-neutral-900 border border-neutral-400 rounded-[8px] cursor-pointer'
        >
          <li>{isActive}</li>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpenList ? 'rotate-180' : 'rotate-0'}`}
          />
        </ul>

        {isOpenList && (
          <ul className='absolute top-full left-0 w-full mt-1 bg-neutral-900 border border-neutral-400  rounded z-50'>
            {ListTitle.map((tab) => (
              <li
                key={tab}
                onClick={() => {
                  setisActive(tab)
                  setIsOpenList(false)
                }}
                className={`px-[12px] flex py-[10px] cursor-pointer text-[14px] hover:bg-neutral-800 ${isActive === tab ? 'bg-lime-500' : 'text-white'
                  }`}
              >
                {tab}{tab === 'FAVORITES' && favoriteList.length > 0 && (
                <span className='ml-[4px] text-[12px] text-[#CEF739]'>({favoriteList.length})</span>
              )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* ListHistoryCard Display */}
      {tabContent[isActive] ?? <p>No Available List</p>}
    </div>
  )
}
