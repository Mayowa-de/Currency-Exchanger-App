import { useState, useEffect } from "react"
import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"


function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD")
  useEffect(()=>{
    const response = await fetch('https://currency-exchanger-app-backend.onrender.com/api?code')
    const data = response.json()
  }, [])

  return (
    <div className=" w-full flex flex-col items-center ">
      <Header />
      <SliderSection baseCurrency={baseCurrency} />
      <Main baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
    </div>
  )
}

export default App
