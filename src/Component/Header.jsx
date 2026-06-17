import React from 'react'
import Logo from '../assets/images/logo.svg'

export default function Header() {
  return (
    <header className='w-full laptop:h-[66px] flex items-center laptop:p-[20px] laptop:px-[24px] justify-between '>
      <div className='flex items-center '>
        <img src={Logo} alt="Logo" className='text-background' />
      </div>

      <div className='flex items-center space-x-4'>
        <nav>
          <ul className='flex space-x-4'>
            <li><a href="#" className='text-gray-700 '>55 CURRENCIES</a></li>
            <li><a href="#" className='text-gray-700 '>EOD</a></li>
            <li><a href="#" className='text-gray-700 '>ECB DATA</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
