import { useState } from "react"
import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"


function App() {
  const [baseSendCurrency, setBaseSendCurrency] = useState("USD")
  const [baseReceiveCurrency, setBaseReceiveCurrency] = useState("EUR")

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-neutral-900 pt-[86px] md:pt-[106px]">
    <div className='flex w-full flex-col items-center'>
      <Header baseCurrency={baseSendCurrency} />
      </div>
      <Main baseSendCurrency={baseSendCurrency} baseReceiveCurrency={baseReceiveCurrency} setBaseReceiveCurrency={setBaseReceiveCurrency} setBaseSendCurrency={setBaseSendCurrency} />
    </div>
  )
}

export default App
