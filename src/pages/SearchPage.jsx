import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchForm from '../components/SearchForm'
import PropertyList from '../components/PropertyList'
import FavouritesSidebar from '../components/FavouritesSidebar'
import propertiesData from '../data/properties.json'
import '../styles/SearchPage.css'


function SearchPage() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData. properties)
  const [searchCriteria, setSearchCriteria] = useState(null)

  // Handle search
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria)

    const filtered = propertiesData.properties.filter((property) => {
      // Property Type filter
      if (criteria.propertyType !== 'any' && 
          property.type. toLowerCase() !== criteria.propertyType.toLowerCase()) {
        return false
      }

      // Price filter
      if (property.price < criteria.minPrice || property.price > criteria.maxPrice) {
        return false
      }

      // Bedrooms filter
      if (property.bedrooms < criteria.minBedrooms || 
          (criteria.maxBedrooms !== Infinity && property.bedrooms > criteria.maxBedrooms)) {
        return false
      }

      // Postcode filter
      if (criteria.postcode) {
        const propertyPostcode = property.location.split(' ').pop().substring(0, criteria.postcode.length)
        if (propertyPostcode !== criteria.postcode) {
          return false
        }
      }

      // Date filter
      if (criteria.dateFrom || criteria.dateTo) {
        const monthNames = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3,
          'May': 4, 'June': 5, 'July': 6, 'August': 7,
          'September': 8, 'October': 9, 'November': 10, 'December': 11
        }
        
        const propertyDate = new Date(
          property.added.year,
          monthNames[property. added.month],
          property.added.day
        )

        if (criteria.dateFrom && propertyDate < criteria.dateFrom) {
          return false
        }

        if (criteria.dateTo && propertyDate > criteria.dateTo) {
          return false
        }
      }

      return true
    })

    setFilteredProperties(filtered)
  }

  return (
    <div className="search-page">
      {/* Header/Navbar */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <section className="search-page__content" id='search'>
        <Container fluid>
          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />

          {/* Property Results */}
          <div className="search-page__results">
            <PropertyList properties={filteredProperties} />
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="search-page__footer">
        <Container>
          <p>© 2025 CheckEstate | Find Your Dream Home</p>
        </Container>
      </footer>
      <FavouritesSidebar />
    </div>
  )
}

export default SearchPage