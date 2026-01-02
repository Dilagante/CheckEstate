import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PropertyList from "./components/PropertyList";
import propertiesData from "./data/properties.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Header />

        <main>
          <Hero />
          <Container fluid style={{padding: "2rem", background: "#f9fafb",minHeight: "100vh",}}
          >
            <h1 style={{textAlign: "center", marginBottom: "2rem", color: "#111827",}}>
              🏠 Estate Agent Properties
            </h1>

            <PropertyList properties={propertiesData.properties} />
          </Container>
        </main>
      </div>
    </>
  );
}

export default App;
