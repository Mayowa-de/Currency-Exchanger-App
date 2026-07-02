import React, { useState, useEffect, useRef} from 'react'
import Vertical_Exchange from '../assets/images/icon-exchange-vertical.svg'
import Exchange from '../assets/images/icon-exchange.svg'
import StarIcon from '../assets/images/icon-star.svg'
import { getFlag } from './crrencyFlags'
import {ChevronDown} from 'lucide-react'


export default function FirstCardSection({ baseSendCurrency, setBaseSendCurrency,baseReceiveCurrency, setBaseReceiveCurrency,  options }) {
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const sendDropdownRef = useRef(null);
  const receiveDropdownRef = useRef(null);

   // NEW: input + conversion state
  const [sendAmount, setSendAmount] = useState(1000);
  const [receiveAmount, setReceiveAmount] =useState(0);
  const [currencyRate, setCurrencyRate ] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState(null);
  
  useEffect(() => {
  function handleClickOutsideSend(e) {
    if (sendDropdownRef.current && !sendDropdownRef.current.contains(e.target)) {
      setIsSendOpen(false)
    }
  }

  function handleClickOutsideReceive(e) {
    if (receiveDropdownRef.current && !receiveDropdownRef.current.contains(e.target)) {
      setIsReceiveOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutsideSend)
  document.addEventListener("mousedown", handleClickOutsideReceive)

  return () => {
    document.removeEventListener("mousedown", handleClickOutsideSend)
    document.removeEventListener("mousedown", handleClickOutsideReceive)
  }
}, [])

  const handleConvert = async () => {
  setConversionError(null)

  if (!sendAmount || isNaN(Number(sendAmount)) || Number(sendAmount) <= 0) {
    setConversionError('Enter a valid amount')
    return
  }

  if (baseSendCurrency === baseReceiveCurrency) {
    setReceiveAmount(sendAmount)
    return
  }

  setIsConverting(true)
  try {

    console.log('Converting:', sendAmount, baseSendCurrency, baseReceiveCurrency)
    const response = await fetch(
      `https://currency-exchanger-app-backend.onrender.com/api?amount=${sendAmount}&from=${baseSendCurrency}&to=${baseReceiveCurrency}` || 'http://localhost:3000/api'
    )
    const data = await response.json()
    console.log('API response:', data)
    const currencyMatch = data.currencies.find((c)=> c.code === baseReceiveCurrency)
    const rateResult = currencyMatch.rate.toFixed(2)
    const result = currencyMatch ? currencyMatch.rate.toFixed(2) * Number(sendAmount) : null
    console.log('Conversion result:', currencyMatch)

    if (currencyMatch === undefined) {
      setConversionError('Rate not available for this pair')
      return
    }
    setCurrencyRate(rateResult)
    setReceiveAmount(result)
  } catch (err) {
    console.error('Conversion failed:', err.message)
    setConversionError('Conversion failed, try again')
  } finally {
    setIsConverting(false)
  }
}

  return (
    <section className='flex flex-col w-full md:w-[1036px] md:h-[931px]  gap-[16px]'>
      <h1 className='text-[1.25rem] text-[jetbrains-mono, regular] tracking-[-0.5px] leading-[120%] text-[#FFFFFF]'>CHECK THE RATE</h1>

      <div className='md:grid md:grid-cols-1 flex flex-col   bg-[#202022] px-[20px] p-[20px] rounded-[24px] gap-[24px]'>
        <div className='md:flex-row  flex flex-col gap-[12px]  md:gap-[8px] items-center justify-center'>
          <div className='md:w-[450px] w-full  md:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>SEND</h2>
            <div className='flex justify-between gap-[auto]'>
                <input value={sendAmount} onChange={(e)=>{ 
               const value= e.target.value
              if (/^\d*\.?\d*$/.test(value))
              {
               setSendAmount(value)
                 }}} 
              className='w-[123px] h-[40px] bg-transparent text-[#FFFF] focus:border-b-[2px] px-[3px] text-[2rem] focus:ring-2 focus-within:ring-[#CEF739] rounded-[8px] border-none focus:border-[2px] outline-none focus:border-[#CEF739]' />
              <div ref={sendDropdownRef} className='relative w-[110px]'>
              <button onClick={()=>setIsSendOpen(!isSendOpen)} className='flex items-center h-[38px] gap-[8px] w-[95px] bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px] px-[8px] text-white text-[14px]'>
                {getFlag(baseSendCurrency) && (
                  <img src={getFlag(baseSendCurrency)} alt={baseSendCurrency} className='w-[15px] h-[15px] border-none rounded-full'/>
                )}
                <span>{baseSendCurrency}</span>
                <ChevronDown size={14} className={`ml-auto transition-transform duration-200 ${isSendOpen ? 'rotate-180' : 'rotate-0'}`}/>
              </button>
              {isSendOpen && (
                <ul className='absolute top-full left-0 mt-[4px] px-[8px] md:w-[250px] w-full max-h-[250px]  overflow-y-auto  z-50 bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px]'>
                  {options.map((code)=>(
                    <li key={code} onClick={()=>{setBaseSendCurrency(code)
                      setIsSendOpen(false)
                    }}
                    className={`flex items-center gap-2 px-[8px] py-[6px] cursor-pointer text-white text-[14px] hover:bg-[#CEF739] hover:text-black ${baseSendCurrency === code ? 'bg-[#CEF739] text-black' : ''}`}
                    >
                      {getFlag(code) && (
                        <img src={getFlag(code)} alt={code} className='w-[18px] h-[12px] object-cover rounded-sm'/>
                      )}
                      <span>{code}</span>
                      </li>
                  ))}
                  </ul>
              )}
            </div>
            </div>
          </div>
          
          <button onClick={handleConvert} className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739]' role='button'>
            <img src={Vertical_Exchange} alt="exchange-icon-vertical" className='w-[20px] h-[20px] items-center flex md:hidden '/>
            <img src={Exchange} alt="exchange-icon" className='w-[20px] h-[20px] items-center md:flex hidden' />
          </button>
          
          <div className='laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'>
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>RECEIVE</h2>
            <div className='flex justify-between gap-[auto]'>
              <input
                type="text"
                readOnly
                value={receiveAmount}
                placeholder="0"
               className='w-[123px] h-[40px] bg-transparent focus:border-b-[2px] text-[#CEF739] pr-[1px] px-[5px] text-[2rem] rounded-[8px] border-none focus:ring-[2px] focus:outline-none focus:ring-[#CEF739]'
              
              />
            <div ref={receiveDropdownRef} className='relative w-[110px]'>
              <button onClick={()=>setIsReceiveOpen(!isReceiveOpen)} className='flex items-center h-[38px] gap-[8px] w-[95px] bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px] px-[8px] text-white text-[14px]'>
                {getFlag(baseReceiveCurrency) && (
                  <img src={getFlag(baseReceiveCurrency)} alt={baseReceiveCurrency} className='w-[15px] h-[15px] border-none rounded-full'/>
                )}
                <span>{baseReceiveCurrency}</span>
                <ChevronDown size={14} className={`ml-auto transition-transform duration-200 ${isReceiveOpen ? 'rotate-180' : 'rotate-0'}`}/>
              </button>
              {isReceiveOpen && (
                <ul className='absolute top-full left-0 mt-[4px] px-[8px] md:w-[250px] w-full max-h-[250px]  overflow-y-auto  z-50 bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px]'>
                  {options.map((code)=>(
                    <li key={code} onClick={()=>{setBaseReceiveCurrency(code)
                      setIsReceiveOpen(false)
                        }}
                    className={`flex items-center gap-2 px-[8px] py-[6px] cursor-pointer text-white text-[14px] hover:bg-[#CEF739] hover:text-black ${baseReceiveCurrency === code ? 'bg-[#CEF739] text-black' : ''}`}
                    >
                      {getFlag(code) && (
                        <img src={getFlag(code)} alt={code} className='w-[18px] h-[12px] object-cover rounded-sm'/>
                      )}
                      <span>{code}</span>
                      </li>
                  ))}
                  </ul>
              )}
            </div>
              </div>
            </div>
          </div>


        <hr className='text-[5px] border-dashed border-[1px] border-neutral-900 leading-1' />
        <div className='flex md:justify-between flex-col md:items-center'>
          <div className='text-[14px] flex'>
             {isConverting && <span>Converting...</span>}
             {!isConverting && conversionError && <span className='text-red-500'>{conversionError}</span>}
             {!isConverting && !conversionError && receiveAmount && sendAmount && (
            <span className='text-[#CEF739] flex gap-[4px] items-center'>
            {sendAmount}  {baseSendCurrency}  <img src={Exchange} alt='Exchange icon' className='w-[12px] h-[12px] p-[4px]'/>{receiveAmount} {baseReceiveCurrency} = {currencyRate}
           </span>
            )}
          </div>

          <div className='flex gap-2 items-center'>
            <button className='bg-[#CEF739] flex  focus:border-neutral-900 focus:border-[1px] focus:ring-[#CEF739] focus:ring-1 focus:outline-none  leading-[1.3] tracking-[0.5px] rounded-[8px] px-[12px] p-[8px] items-center gap-[8px]'>
             <img src={StarIcon} width={'16px'} height={'16px'} alt='star-icon' className='text-neutral-900  overflow-hidden'/>
              Favorited
            </button>
            <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none  leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-neutral-900 rounded-[8px] px-[12px] p-[8px]'>LOG CONVERSION</button>
          </div>
        </div>
      </div>
    </section>
  )
}
