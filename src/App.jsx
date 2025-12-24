import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="App">
        <Header/>
        
        {/* Rest of your app */}
        <main>
          {/* Your routes/content here */}
        </main>
      </div>
    </>
  )
}

export default App
