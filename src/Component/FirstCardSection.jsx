import React, { useState } from 'react'
import Vertical_Exchange from '../assets/images/icon-exchange-vertical.svg'
import Exchange from '../assets/images/icon-exchange.svg'
import StarIcon from '../assets/images/icon-star.svg'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { getFlag } from './crrencyFlags'
import StarFillIcon from '../assets/images/icon-star-filled.svg'

export default function FirstCardSection({ baseCurrency, setBaseCurrency, getCode }) {
  const [isStared, setisStared] = useState(false)
  const selectedFlag = getFlag(baseCurrency)

  return (
    <section className='flex flex-col w-full md:w-[1036px] md:h-[931px] gap-[16px]'>
      <h1 className='text-[1.25rem] tracking-[-0.5px] leading-[120%] text-[#FFFFFF]'>CHECK THE RATE</h1>

      <div className='flex flex-col bg-[#202022] px-[20px] p-[20px] rounded-[24px] gap-[24px]'>
        <div className='md:flex-row flex flex-col gap-[12px] md:gap-[8px] items-center justify-center'>

          {/* SEND */}
          <div className='md:w-[450px] w-full md:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>SEND</h2>
            <div className='flex justify-between'>
              <input
                type="text"
                className='w-[123px] h-[40px] bg-transparent text-[#FFFF] px-[3px] text-[2rem] rounded-[8px] border-none outline-none focus:border-b-[2px] focus:border-[#CEF739]'
              />
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className='flex items-center gap-2 w-[120px]'>
                  <div className='flex items-center gap-2'>
                    {selectedFlag && (
                      <img src={selectedFlag} alt={`${baseCurrency} flag`} className='w-[20px] h-[14px] object-cover rounded-sm' />
                    )}
                    <SelectValue placeholder={baseCurrency} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 px-[4px]">
                  {getCode.map((code) => (
                    <SelectItem key={code} value={code}>
                      <div className='flex items-center gap-2'>
                        {getFlag(code) && (
                          <img src={getFlag(code)} alt={`${code} flag`} className='w-[18px] h-[12px] object-cover rounded-sm' />
                        )}
                        <span className='text-white'>{code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <button className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739]'>
            <img src={Vertical_Exchange} alt="exchange-icon-vertical" className='w-[20px] h-[20px] flex md:hidden' />
            <img src={Exchange} alt="exchange-icon" className='w-[20px] h-[20px] md:flex hidden' />
          </button>

          {/* RECEIVE */}
          <div className='md:w-[450px] w-full md:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>RECEIVE</h2>
            <div className='flex justify-between'>
              <input
                type="text"
                className='w-[123px] h-[40px] bg-transparent text-[#CEF739] px-[5px] text-[2rem] rounded-[8px] border-none outline-none focus:ring-[2px] focus:ring-[#CEF739]'
              />
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className='flex items-center gap-2 w-[120px]'>
                  <div className='flex items-center gap-2'>
                    {selectedFlag && (
                      <img src={selectedFlag} alt={`${baseCurrency} flag`} className='w-[20px] h-[14px] object-cover rounded-sm' />
                    )}
                    <SelectValue placeholder={baseCurrency} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 px-[4px]">
                  {getCode.map((code) => (
                    <SelectItem key={code} value={code}>
                      <div className='flex items-center gap-2'>
                        {getFlag(code) && (
                          <img src={getFlag(code)} alt={`${code} flag`} className='w-[18px] h-[12px] object-cover rounded-sm' />
                        )}
                        <span className='text-white'>{code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <hr className='border-dashed border-[1px] border-neutral-900' />

        <div className='flex justify-end items-center'>
          <div className='flex gap-2'>
            <button
              className='bg-[#CEF739] flex focus:ring-[#CEF739] focus:ring-1 focus:outline-none leading-[1.3] tracking-[0.5px] rounded-[8px] px-[12px] p-[8px] items-center gap-[8px]'
              onClick={() => setisStared(!isStared)}
            >
              {isStared
                ? <img src={StarFillIcon} width='16px' height='16px' alt='star-filled-icon' />
                : <img src={StarIcon} width='16px' height='16px' alt='star-icon' />
              }
              Favorited
            </button>
            <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-neutral-900 rounded-[8px] px-[12px] p-[8px]'>
              LOG CONVERSION
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>
          <button className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739]' role='button'>
            <img src={Vertical_Exchange} alt="exchange-icon-vertical" className='w-[20px] h-[20px] items-center flex md:hidden '/>
            <img src={Exchange} alt="exchange-icon" className='w-[20px] h-[20px] items-center md:flex hidden' />
          </button>
          <div className='laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>RECEIVE</h2>
            <div className='flex justify-between gap-[auto]'>
              <input type="text" className='w-[123px]  h-[40px] bg-transparent focus:border-b-[2px] text-[#CEF739] pr-[1px] px-[5px] text-[2rem]  rounded-[8px] border-none focus:ring-[2px] focus:outline-none focus:ring-[#CEF739]' />
                <Select value={baseCurrency} onValueChange={setBaseCurrency} id="receive-currency" className=' appearance-none focus:outline-none text-white border-none text-[14px] tracking-[1px] '>
                  <SelectTrigger className='flex relative items-center gap-2 justify-between w-[120px] '>
                    <div className='flex items-center gap-2 '>
                      {selectedFlag && <img src={selectedFlag} alt={`${baseCurrency} flag`} className='w-[20px] h-[14px] object-cover rounded-sm' />}
                      <SelectValue placeholder={baseCurrency} className="text-white/20/>
                    </div>
                  </SelectTrigger>
                  <SelectContent className=' px-[4px]  bg-neutral-600'>
                    {getCode.map((code) => (
                      <SelectItem key={code} value={code} className="bg-neutral-500 ">
                        <div className='flex items-center gap-2'>
                          <img src={getFlag(code)} alt={`${code} flag`} className='w-[18px] h-[12px] object-cover rounded-sm' />
                          <span className='text-neutral-600'>{code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <hr className='text-[5px] border-dashed border-[1px] border-neutral-900 leading-1' />
        <div className='flex justify-between items-center'>
          <div></div>

          <div className='flex gap-2'>
            <button className='bg-[#CEF739] flex  focus:border-neutral-900 focus:border-[1px] focus:ring-[#CEF739] focus:ring-1 focus:outline-none  leading-[1.3] tracking-[0.5px] rounded-[8px] px-[12px] p-[8px] items-center gap-[8px]' onClick={()=>setisStared(!isStared)}>
              {isStared ? <img src={StarFillIcon} width={'16px'} height={'16px'} alt='star-filled-icon' className="shadow-md"/> : <img src={StarIcon} width={'16px'} height={'16px'} alt='star-icon' className='text-neutral-900  overflow-hidden'/>}
              Favorited
            </button>
            <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none  leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-neutral-900 rounded-[8px] px-[12px] p-[8px]'>LOG CONVERSION</button>
          </div>
        </div>
      </div>
    </section>
  )
}
