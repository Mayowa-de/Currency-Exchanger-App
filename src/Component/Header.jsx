import React from 'react'
import Logo from '../assets/images/logo.svg'

export default function Header() {
  return (
    <header className='w-full md:h-[66px] flex gap-[8px] items-center md:p-[20px] md:px-[24px] justify-center md:justify-between '>
      <div className='flex items-center '>
        <img src={Logo} alt="Logo" className='w-[180px] h-[22px]' />
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
