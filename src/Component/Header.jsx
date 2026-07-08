import React from 'react'
import Logo from '../assets/images/logo.svg'

export default function Header() {
  return (
    <header className='w-full h-[52px] md:h-[66px] bg-[#171717] flex gap-[8px] z-50  items-center md:p-[20px] px-[24px]  justify-between '>
      <div className='flex items-center '>
        <img src={Logo} alt="Logo" className='md:w-[180px] w-[107px] md:h-[22px] h-[20px]' />
      </div>

      <div className='flex items-center md:space-x-4'>
        <nav>
          <ul className='flex md:space-x-4 text-[10px] gap-[2px]  md:text-[12px]'>
            <li><a href="#" className='text-gray-700 '>55 CURRENCIES</a></li>
            <li><a href="#" className='text-gray-700 '>EOD</a></li>
            <li><a href="#" className='text-gray-700 '>ECB DATA</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
