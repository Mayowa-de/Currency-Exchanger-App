import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Vertical_Exchange from '../assets/images/icon-exchange-vertical.svg'
import Exchange from '../assets/images/icon-exchange.svg'
import StarIcon from '../assets/images/icon-star.svg'
import StarIconFilled from '../assets/images/icon-star-filled.svg'
import { getFlag } from './currencyFlags'
import { Check, ChevronDown, Search } from 'lucide-react'


export default function FirstCardSection({ baseSendCurrency, setBaseSendCurrency, baseReceiveCurrency, setBaseReceiveCurrency, options, addConversionLog, favoriteActions }) {
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [sendSearch, setSendSearch] = useState('')
  const [receiveSearch, setReceiveSearch] = useState('')
  const sendDropdownRef = useRef(null);
  const receiveDropdownRef = useRef(null);

  // NEW: input + conversion state
  const [sendAmount, setSendAmount] = useState(1000);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = favoriteActions
  const currentPairIsFavorite = isFavorite(baseSendCurrency, baseReceiveCurrency)
  const popularCurrencies = ['USD', 'EUR', 'GBP']

  const renderCurrencyOptions = (selectedCurrency, searchValue, setCurrency, setSearch) => {
    const normalizedSearch = searchValue.trim().toLowerCase()
    const matchingOptions = options.filter((code) => code.toLowerCase().includes(normalizedSearch))
    const popularOptions = popularCurrencies.filter((code) => matchingOptions.includes(code))
    const otherOptions = matchingOptions.filter((code) => !popularCurrencies.includes(code))

    // Dropdown menu item component
    const renderOption = (code) => (
      <motion.li
        key={code}
        whileHover={{ x: 2, backgroundColor: '#CEF739', color: '#000' }}
        onClick={() => {
          setCurrency(code)
          setSearch('')
          setIsSendOpen(false)
          setIsReceiveOpen(false)
        }}
        className={`flex cursor-pointer items-center gap-2 rounded-[6px] px-[10px] py-[8px]  text-[14px] text-white ${selectedCurrency === code ? 'border-[#CEF739] border p-4 text-black' : ''}`}
      >
        {getFlag(code) && (
          <img src={getFlag(code)} alt={code} className='h-[15px] w-[15px] rounded-full object-cover' />
        )}
        <span>{code}</span>
        {selectedCurrency === code && <Check size={16} className='ml-auto' aria-label='Selected' />}
      </motion.li>
    )

    return (
      <>
        <div className='sticky top-0 z-50 bg-[#2E2E2E] pb-[8px] flex items-center gap-[8px]  pt-[8px]'>
          <label className='flex w-full h-[38px] items-center gap-[8px] rounded-[8px] border border-[#555] bg-[#202022] px-[10px] text-neutral-400'>
            <Search size={15} aria-hidden='true' />
            <input
              type='search'
              value={searchValue}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search currency code...'
              className='min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-neutral-500 placeholder:text-[12px]'
              autoFocus
            />
          </label>
        </div>
        {popularOptions.length > 0 && (
          <>
            <p className='px-[10px] pb-[4px] pt-[2px] text-[10px] tracking-[1px] text-neutral-500'>POPULAR</p>
            {popularOptions.map(renderOption)}

            <div className='flex justify-between items-center px-[10px] pb-[2px] pt-[2px] '>
            <p className='text-[10px] tracking-[1px] text-neutral-500'>OTHER CURRENCIES</p>
            <span className='text-[10px] tracking-[1px] text-neutral-500'>52</span>
            </div>
            {otherOptions.length > 0 && <div className='my-[6px] border-t border-neutral-600' />}
          </>
        )}
        {otherOptions.length > 0 ? otherOptions.map(renderOption) : (
          popularOptions.length === 0 && <p className='px-[10px] py-[16px] text-center text-[12px] text-neutral-500'>No currencies found</p>
        )}
      </>
    )
  }

  // currencyConvert promise 
  const currencyConvert = async () => {
    setConversionError(null)

    if (!sendAmount || isNaN(Number(sendAmount)) || Number(sendAmount) <= 0) {
      setConversionError('Enter a valid amount')
      return
    }

    if (baseSendCurrency === baseReceiveCurrency) {
      setCurrencyRate(1)
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
      const currencyMatch = data.currencies.find((c) => c.code === baseReceiveCurrency)
      const rateResult = currencyMatch.rate.toFixed(2)
      const result = currencyMatch ? currencyMatch.rate.toFixed(2) * Number(sendAmount) : null
      console.log('Conversion result:', currencyMatch)

      if (currencyMatch === undefined) {
        setConversionError('Rate not available for this pair')
        return
      }
      setCurrencyRate(rateResult)
      
      setReceiveAmount(Number(result).toLocaleString())

      // setReceiveAmount(result)
    } catch (err) {
      console.error('Conversion failed:', err.message)
      setConversionError('Conversion failed, try again')
    } finally {
      setIsConverting(false)
    }
  }

  // currencyConvert promise pass to handleCovert function
  const handleConvert = () => currencyConvert()

  // Log conversion function to add conversion log
  const handleLogConversion = () => {
    if (conversionError || isConverting || !receiveAmount || !sendAmount || !currencyRate) {
      return
    }

    addConversionLog({
      amount: Number(sendAmount),
      fromCurrency: baseSendCurrency,
      toCurrency: baseReceiveCurrency,
      convertedAmount: Number(String(receiveAmount).replaceAll(',', '')),
      rate: Number(currencyRate),
    })
  }

  const handleFavoriteToggle = () => {
    const pair = {
      baseCurrency: baseSendCurrency,
      baseReceiveCurrency,
    }

    if (currentPairIsFavorite) {
      removeFavorite(pair)
    } else {
      addFavorite(pair)
    }
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      currencyConvert()
    }, 500)
    return () => clearTimeout(timer)
  }, [sendAmount, baseReceiveCurrency, baseSendCurrency])

  // Loading state for the converter card
  if(!baseSendCurrency || !baseReceiveCurrency || !options || options.length === 0) {
    return  <section className='flex flex-col w-full md:w-[1036px] md:h-[931px]  gap-[16px]'> 
      <h1 className='text-[1.25rem] text-[jetbrains-mono, regular] tracking-[-0.5px] leading-[120%] text-[#FFFFFF]'>CHECK THE RATE</h1>

           <div className='md:grid md:grid-cols-1 flex flex-col   bg-[#202022] px-[20px] p-[20px] rounded-[24px] gap-[24px]'>
            <div className='md:flex-row  flex flex-col gap-[12px]  md:gap-[8px] items-center justify-center'>
             {/* send currencies card */}
          <div className='md:w-[450px] w-full  md:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'></div>

          {/* convert currencies button */}
           <button  className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739]' ></button>

          {/* Receive currencies card */}
            <div className='laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px]'></div>
          </div>
          {/* loading state for converter currencies */}
          <div className='flex md:justify-between md:flex-row  md:items-center gap-[8px]'>
            <div className='text-[14px] flex gap-4 w-full'>
          <span className='text-[#CEF739] flex gap-[4px] items-center bg-[#2E2E2E] px-[10px] p-[10px] w-[156px] h-10 rounded-[8px]'></span>

          </div>
          <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-[#2E2E2E] h-10 w-[132px] rounded-[8px] px-[12px] p-[8px]'></button>
          <button className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-[#2E2E2E] h-10 w-[132px] rounded-[8px] px-[12px] p-[8px]'></button>
          </div>
          </div>
    </section>
  }


  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative flex w-full flex-col gap-[16px] md:w-[1036px] ${isReceiveOpen ? 'z-30' : 'z-0'} ${isSendOpen ? 'z-30' : 'z-0'}`}
    >
      <h1 className='text-[1.25rem] text-[jetbrains-mono, regular] tracking-[-0.5px] leading-[120%] text-[#FFFFFF]'>CHECK THE RATE</h1>

      <div className='md:grid md:grid-cols-1 flex flex-col bg-[#202022] drop-shadow px-[20px] p-[20px] rounded-[24px] gap-[24px]'>
        <div className='md:flex-row flex flex-col gap-[12px] md:gap-[8px] items-center justify-center'>
          {/* send currencies card */}
          <motion.div
            layout
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className='md:w-[450px] w-full md:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] '
          >
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>SEND</h2>
            <div className='relative flex justify-between gap-[auto]'>
              <input value={sendAmount} onChange={(e) => {
                const value = e.target.value
                if (/^\d*\.?\d*$/.test(value)) {
                  setSendAmount(value)
                }
              }}
                className='w-[123px] h-[40px] bg-transparent text-neutral-200 focus:border-b-[2px] px-[3px] text-[2rem] focus:ring-2 focus-within:ring-[#CEF739] rounded-[8px] border-none focus:border-[2px]  outline-none focus:border-[#CEF739]' />
              <div ref={sendDropdownRef} className='z-30 flex w-full justify-end md:relative md:w-[110px]'>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsSendOpen(!isSendOpen)}
                  className='flex items-center h-[38px] gap-[8px] w-[95px] bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px] px-[8px] text-white text-[14px] focus:ring-[2px] focus:ring-[#CEF739]'
                >
                  {getFlag(baseSendCurrency) && (
                    <img src={getFlag(baseSendCurrency)} alt={baseSendCurrency} className='w-[15px] h-[15px] border-none rounded-full' />
                  )}
                  <span>{baseSendCurrency}</span>
                  <ChevronDown size={14} className={`ml-auto transition-transform duration-200 ${isSendOpen ? 'rotate-180' : 'rotate-0'}`} />
                </motion.button>
                <AnimatePresence>
                  {isSendOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className='absolute -left-1/2 top-full z-50 mt-[4px] max-h-[min(520px,70vh)] w-[min(350px,calc(100vw-24px))] max-w-[calc(100vw-24px)] -translate-x-1/2 origin-top overflow-y-auto rounded-[8px] border border-[#3D3D3D] bg-[#2E2E2E] p-[8px] shadow-[0_12px_30px_rgba(0,0,0,0.35)] md:left-auto md:right-0 md:translate-x-0'
                    >
                      {renderCurrencyOptions(baseSendCurrency, sendSearch, setBaseSendCurrency, setSendSearch)}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* convert currencies button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleConvert}
            className='w-[48px] h-[48px] px-[10px] p-[10px] bg-[#2E2E2E] rounded-[8px] items-center flex justify-center focus:border-2 focus:border-[#CEF739] shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
          >
            <img src={Vertical_Exchange} alt="exchange-icon-vertical" className='w-[20px] h-[20px] items-center flex md:hidden ' />
            <img src={Exchange} alt="exchange-icon" className='w-[20px] h-[20px] items-center md:flex hidden' />
          </motion.button>

          {/* Receive currencies card */}
          <motion.div
            layout
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className={`laptop:w-[450px] w-full laptop:h-[118px] px-[20px] p-[20px] gap-[20px] rounded-[16px] bg-[#2E2E2E] border-[#3D3D3D] border-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${isReceiveOpen ? 'relative z-50' : 'relative z-0'}`}
          >
            <h2 className='text-[#C6C6C6] text-[14px] tracking-[1px]'>RECEIVE</h2>
            <div className='relative flex justify-between gap-[auto]'>
              <motion.input
                type="text"
                readOnly
                value={receiveAmount}
                placeholder="0"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className='w-[123px] h-[40px] bg-transparent focus:border-b-[2px] text-[#CEF739] pr-[1px] px-[5px] text-[2rem] rounded-[8px] border-none focus:ring-[2px] focus:outline-none focus:ring-[#CEF739]'
              />
              {/* Receive drop-down currencies  */}
              <div ref={receiveDropdownRef} className='flex w-full justify-end md:relative md:w-[110px]'>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsReceiveOpen(!isReceiveOpen)}
                  className='flex items-center h-[38px] gap-[8px] w-[95px] bg-[#2E2E2E] border border-[#3D3D3D] rounded-[8px] px-[8px] text-white text-[14px] focus:ring-[2px] focus:ring-[#CEF739]'
                >
                  {getFlag(baseReceiveCurrency) && (
                    <img src={getFlag(baseReceiveCurrency)} alt={baseReceiveCurrency} className='w-[15px] h-[15px] border-none rounded-full' />
                  )}
                  <span>{baseReceiveCurrency}</span>
                  <ChevronDown size={14} className={`ml-auto transition-transform duration-200 ${isReceiveOpen ? 'rotate-180' : 'rotate-0'}`} />
                </motion.button>
                <AnimatePresence>
                  {isReceiveOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className='absolute -left-1/2 top-full z-50 mt-[4px] max-h-[min(520px,70vh)] w-[min(350px,calc(100vw-24px))] max-w-[calc(100vw-24px)] translate-x-40 origin-top overflow-y-auto rounded-[8px] border border-[#3D3D3D] bg-[#2E2E2E] p-[8px] shadow-[0_12px_30px_rgba(0,0,0,0.35)] md:left-auto md:right-0 md:translate-x-0'
                    >
                      {renderCurrencyOptions(baseReceiveCurrency, receiveSearch, setBaseReceiveCurrency, setReceiveSearch)}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        <hr className='text-[5px] border-dashed border-[1px] border-neutral-900 leading-1' />
        {/* Currencies converted display */}
        <div className='flex md:justify-between md:flex-row flex-col md:items-center gap-[8px]'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={`${sendAmount}-${baseSendCurrency}-${baseReceiveCurrency}-${conversionError || 'valid'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className='text-[14px] flex'
            >
              {isConverting && <span>Converting...</span>}
              {!isConverting && conversionError && <span className='text-red-500'>{conversionError}</span>}
              {!isConverting && !conversionError && receiveAmount && sendAmount && (
                <span className='text-[#CEF739] flex gap-[4px] items-center'>
                  {sendAmount}  {baseSendCurrency}  <img src={Exchange} alt='Exchange icon' className='w-[12px] h-[12px] p-[4px]' />{receiveAmount} {baseReceiveCurrency} = {currencyRate}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Favorite and log conversion buttons */}
          <div className='flex gap-4 items-center flex-wrap'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type='button'
              onClick={handleFavoriteToggle}
              aria-pressed={currentPairIsFavorite}
              className={`flex items-center text-[12px] gap-[8px] rounded-[8px] px-[12px] p-[8px] leading-[1.3] tracking-[0.5px] focus:border-neutral-900 focus:border-[1px] focus:ring-[#CEF739] focus:ring-1 focus:outline-none ${currentPairIsFavorite ? 'bg-[#CEF739] text-neutral-900' : 'bg-neutral-900 text-neutral-50'}`}
            >
              <img src={currentPairIsFavorite ? StarIcon : StarIconFilled} width={'16px'} height={'16px'} alt='' className='overflow-hidden ' />
              {currentPairIsFavorite ? 'Favorited' : 'Favorite'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogConversion}
              disabled={isConverting || Boolean(conversionError) || !receiveAmount}
              className='focus:ring-[#CEF739] focus:ring-2 focus:outline-none leading-[1.3] tracking-[0.5px] text-neutral-50 text-[12px] bg-neutral-900 rounded-[8px] px-[12px] p-[8px]'
            >
              LOG CONVERSION
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
