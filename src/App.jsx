import Header from "./Component/Header"
import SliderSection from "./Component/SliderSection"
import Main from "./Component/Main"
import "./index.css"
function App() {
  

  return (
    <div className=" w-full flex flex-col items-center ">
      <Header />
      <SliderSection />
      <Main/>
    </div>

  )
}

export default App
