import { Container } from "react-bootstrap";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <Container className="hero-content">
        <h1 className="hero-title">Find Your Perfect Home</h1>
        <p className="hero-subtitle">
          Discover exceptional properties across the country, from cosy flats to
          luxury family homes, your dream property is just a search away.
        </p>
      </Container>
    </section>
  );
}

export default Hero;
