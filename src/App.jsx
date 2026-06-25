import { useState } from "react"
import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"


function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  return (
    <div className=" w-full flex flex-col items-center ">
      <Header />
      <SliderSection baseCurrency={baseCurrency} />
      <Main baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
    </div>
  )
}

export default App
