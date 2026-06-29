import React, {useState} from 'react'

export default function ListHistoryButton() {
    const [isActive, setisActive] = useState("HISTORY")

    const ListTitle = ['HISTORY', 'COMPARE', 'FAVORITES', 'LOG']
    
  return (
    <div className='laptop:w-[1036px] laptop:gap-[20px] mt-2'>
      <ul className='md:flex hidden gap-[8px] text-[#FFFF]'>
        {ListTitle.map((tab)=>(
        <div className='flex flex-col gap-[4px]' key={tab} onClick={()=>{setisActive(tab)}} role='button'>
        <li className='p-[8px] text-[16px]'>{tab}</li>
        <hr className={isActive === tab ? 'border-lime-500' : 'border-none'} />
        </div>
        ))}
      </ul>
      <hr className='border-neutral-600 md:flex hidden'/>

       <select className='flex w-full h-[40px] md:hidden rounded px-[12px] text-white bg-neutral-700 border-1 border-neutral-400' >
        {ListTitle.map((tab) => (
          <div className='flex' onClick={()=>{setisActive(tab)}}>
          <option key={tab} >{tab}</option>
          </div>
        ))}
        </select>
    </div>
  )
}
