import { useState } from 'react'
import Header from './components/Header'
import TopSection from './components/Hero'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="App">
        <Header/>
        

        <main>
                  <TopSection/>
        </main>
      </div>
    </>
  )
}

export default App
