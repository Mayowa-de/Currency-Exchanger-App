import React, {useState} from 'react'

export default function ListHistoryButton() {
    const [isActive, setisActive] = useState(false)
  return (
    <div className='laptop:w-[1036px] laptop:h-[42px]'>
      <ul className='flex  gap-[8px] text-[#FFFF]'>
        <div className='flex flex-col gap-[8px]'>
        <li className='p-[16px] text-[16px]' role='button'>HISTORY</li>
        <hr className={isActive ? 'border-lime-500' : 'border-none'} />
        </div>
        <div className='flex flex-col gap-[8px]'>
        <li className='p-[16px] text-[16px]' role='button'>COMPARE</li>
         <hr className={isActive ? 'border-none' : 'border-lime-500'} />
        </div>
        <div className='flex flex-col gap-[8px]'>
        <li className='p-[16px] text-[16px] flex gap-[8px]' role='button'>FAVORITES<span className='flex px-[3px] p-[1px] tracking-[1.2px] rounded-full items-center text-lime-300 bg-lime-700 text-[12px]'>18</span></li>
        <hr className={isActive ? 'border-none' : 'border-lime-500'} />
        </div>
        <div className='flex flex-col gap-[8px]'>
        <li className='p-[16px] text-[16px] gap-[8px] flex' role='button'>LOG<span className='flex px-[3px] p-[1px] tracking-[1.2px] rounded-full items-center text-lime-300 bg-lime-700 text-[12px]'>18</span></li>
        <hr className={isActive ? 'border-none' : 'border-lime-500'} />
        </div>
      </ul>
      <hr className='border-neutral-600'/>
    </div>
  )
}
