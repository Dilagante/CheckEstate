import { useState } from 'react'
import Header from './components/Header'
import TopSection from './components/Hero'
import './App.css'
import PropertyCard from './components/PropertyCard'

function App() {
  const [count, setCount] = useState(0)

  const sampleProperty = {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    tenure: "Freehold",
    description: "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland.",
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
    picture: "headerPic.jpeg",
    url: "properties/prop1.html",
    added: {
      month: "October",
      day: 12,
      year: 2022
    }
  }

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
