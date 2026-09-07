import { useState } from "react"
import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"


function App() {
  const [baseSendCurrency, setBaseSendCurrency] = useState("USD")
  const [baseReceiveCurrency, setBaseReceiveCurrency] = useState("EUR")

  return (
    <div className=" w-full flex flex-col items-center justify-center gap-64">
    <div className='flex flex-col w-full items-center justify-center gap-10 '>
      <Header baseCurrency={baseSendCurrency} />
      </div>
      <Main baseSendCurrency={baseSendCurrency} baseReceiveCurrency={baseReceiveCurrency} setBaseReceiveCurrency={setBaseReceiveCurrency} setBaseSendCurrency={setBaseSendCurrency} />
    </div>
  )
}

export default App
