import { Container } from 'react-bootstrap'
import '../styles/Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <Container className="hero-content">
        <h1 className="hero-title">Find Your Perfect Home</h1>
        <p className="hero-subtitle">
          Discover exceptional properties across the country,
          from cosy flats to luxury family homes, your dream property is just a search away.
        </p>
        {/* <h2 className="hero-heading">Featuring:</h2>
        {/* <div className="hero-features">
          <div className="hero-feature">
            <span className="feature-icon">🏠</span>
            <span className="feature-text">7+ Properties</span>
          </div>
          <div className="hero-feature">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Multiple Locations</span>
          </div>
          <div className="hero-feature">
            <span className="feature-icon">🔍</span>
            <span className="feature-text">Advanced Search</span>
          </div>
        </div> */}
      </Container>
    </section>
  )
}

export default Hero