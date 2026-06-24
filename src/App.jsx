import { useState, useEffect } from "react"
import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"


function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD")
  useEffect(()=>{
    const response = await fetch('https://api.frankfurter.api?quote')
  })

  return (
    <div className=" w-full flex flex-col items-center ">
      <Header />
      <SliderSection baseCurrency={baseCurrency} />
      <Main baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
    </div>
  )
}

export default App