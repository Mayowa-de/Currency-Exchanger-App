import React from 'react'
import Exchange from '../assets/images/icon-exchange.svg'

export default function FirstCardSection() {
  return (
    <section className='flex flex-col w-[1036px] h-[931px] gap-[16px]'>
      <h1 className='laptop:text-[20px] text-[jetbrains-mono, regular] tracking-[-0.5px] leading-[120%] text-[#FFFFFF]'>CHECK RATE</h1>

      <div className='flex flex-col  bg-[#202022] px-[20px] p-[20px] rounded-[24px] gap-[24px]'>
        <div className='flex gap-[8px] items-center justify-center'>
          <div className='laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>SEND</h2>
            <div className='flex justify-between gap-[auto]'>
              <input type="text" className='w-[123px] h-[40px] bg-transparent text-[#FFFF] focus:border-b-[2px] px-[3px] text-[2rem] focus:ring-2 focus-within:ring-[#CEF739] rounded-[8px] border-none focus:border-[2px] outline-none focus:border-[#CEF739]' />
              <div className='w-[96px] h-[40px] gap[8px] bg-[#2E2E2E] border-[1px] border-[#3D3D3D] p-[10px] px-[10px] rounded-[8px] '>
                <select name="" id="" className='bg-transparent appearance-none focus:outline-none text-white border-none text-[14px] tracking-[1px]'>
                  <option value="USD" className='cursor-pointer'>USD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
          <div className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739]' role='button'>
            <img src={Exchange} alt="exchange-icon" className='w-[20px] h-[20px] items-center flex' />
          </div>
          <div className='laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>RECEIVE</h2>
            <div className='flex justify-between gap-[auto]'>
              <input type="text" className='w-[123px]  h-[40px] bg-transparent focus:border-b-[2px] text-[#CEF739] pr-[1px] px-[5px] text-[2rem]  rounded-[8px] border-none focus:ring-[2px] focus:outline-none focus:ring-[#CEF739]' />
              <div className='w-[96px] h-[40px] gap[8px] bg-[#2E2E2E] border-[1px] border-[#3D3D3D] p-[10px] px-[10px] rounded-[8px] '>
                <select name="" id="" className='bg-transparent appearance-none focus:outline-none text-white border-none text-[14px] tracking-[1px]'>
                  <option value="USD" className='cursor-pointer'>USD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <hr className='text-[5px] border-dashed border-[1px] border-neutral-900 leading-1' />

        <div className='flex justify-between items-center'>
          <div></div>

          <div className='flex gap-2'>
            <button className='bg-[#CEF739] focus:border-neutral-900 focus:border-[1px] focus:ring-[#CEF739] focus:ring-1 focus:outline-none  leading-[1.3] tracking-[0.5px] rounded-[8px] px-[12px] p-[8px]'>Favorited</button>
            <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none  leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-neutral-900 rounded-[8px] px-[12px] p-[8px]'>LOG CONVERSION</button>
          </div>
        </div>
      </div>

    </section>
  )
}
