import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PropertyList from '../components/PropertyList/PropertyList'
import propertiesData from '../data/properties.json'
import '../styles/SearchPage.css'


function SearchPage() {
  return (
    <div className="search-page">
      {/* Header/Navbar */}
      <Header favouritesCount={0} />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <section className="search-page__content">
        <Container fluid>
          {/* Search form will go here later */}
          <div className="search-form-placeholder">
            <p>🔍 Search form coming soon...</p>
          </div>

          {/* Property Results */}
          <div className="search-page__results">
            <PropertyList properties={propertiesData.properties} />
          </div>
        </Container>
      </section>

      {/* Footer (optional for now) */}
      <footer className="search-page__footer">
        <Container>
          <p>© 2025 EstateAgent | Find Your Dream Home</p>
        </Container>
      </footer>
    </div>
  )
}

export default SearchPage