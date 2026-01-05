import { Container } from 'react-bootstrap'
import '../styles/About.css'

function About() {
  return (
    <section className="about-section" id="about">
      <Container className="about-content">
        <h1 className="about-title">Built with React</h1>
        <p className="about-subtitle">
          By Dilhara De Silva for Advanced Client-Side Development CW2.
        </p>
      </Container>
    </section>
  )
}

export default About