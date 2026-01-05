import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchForm from "../components/SearchForm";
import PropertyList from "../components/PropertyList";
import FavouritesSidebar from "../components/FavouritesSidebar";
import About from "../components/About";
import propertiesData from "../data/properties.json";
import "../styles/SearchPage.css";

function SearchPage() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );
  const [searchCriteria, setSearchCriteria] = useState(null);

  // Handle search
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);

    let filtered = [...propertiesData.properties];

    // Quick Search Filter
    if (criteria.quickSearch && criteria.quickSearch.trim() !== "") {
      const searchTerm = criteria.quickSearch.toLowerCase();

      filtered = filtered.filter((property) => {
        // Search in location
        if (property.location.toLowerCase().includes(searchTerm)) return true;

        // Search in description
        if (property.description.toLowerCase().includes(searchTerm))
          return true;

        // Search in type
        if (property.type.toLowerCase().includes(searchTerm)) return true;

        // Search in tenure
        if (property.tenure.toLowerCase().includes(searchTerm)) return true;

        // Search in price (allow searching "500k" or "500000")
        const priceString = property.price.toString();
        if (priceString.includes(searchTerm.replace(/[,£]/g, ""))) return true;
        if (
          searchTerm.includes("k") &&
          priceString.includes(searchTerm.replace("k", "000"))
        )
          return true;
        if (
          searchTerm.includes("m") &&
          priceString.includes(searchTerm.replace("m", "000000"))
        )
          return true;

        // Search in bedrooms
        if (property.bedrooms.toString().includes(searchTerm)) return true;

        // Search in postcode
        const postcode = property.location.split(" ").pop();
        if (postcode.toLowerCase().includes(searchTerm)) return true;

        return false;
      });
    }

    // Property Type filter
    if (criteria.propertyType !== "any" && criteria.propertyType) {
      filtered = filtered.filter(
        (property) =>
          property.type.toLowerCase() === criteria.propertyType.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(
      (property) =>
        property.price >= criteria.minPrice &&
        property.price <= criteria.maxPrice
    );

    // Bedrooms filter
    filtered = filtered.filter((property) => {
      if (property.bedrooms < criteria.minBedrooms) return false;
      if (
        criteria.maxBedrooms !== Infinity &&
        property.bedrooms > criteria.maxBedrooms
      )
        return false;
      return true;
    });

    // Postcode filter
    if (criteria.postcode) {
      filtered = filtered.filter((property) => {
        const propertyPostcode = property.location
          .split(" ")
          .pop()
          .substring(0, criteria.postcode.length);
        return propertyPostcode === criteria.postcode;
      });
    }

    // Date filter
    if (criteria.dateFrom || criteria.dateTo) {
      const monthNames = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      filtered = filtered.filter((property) => {
        const propertyDate = new Date(
          property.added.year,
          monthNames[property.added.month],
          property.added.day
        );

        if (criteria.dateFrom && propertyDate < criteria.dateFrom) return false;
        if (criteria.dateTo && propertyDate > criteria.dateTo) return false;

        return true;
      });
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="search-page">
      {/* Header/Navbar */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <section className="search-page__content" id="search">
        <Container fluid>
          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />

          {/* Property Results */}
          <div className="search-page__results">
            <PropertyList properties={filteredProperties} />
          </div>
        </Container>
      </section>

      <About />

      {/* Footer */}
      <footer className="search-page__footer">
        <Container>
          <p>© 2025 CheckEstate | Find Your Dream Home</p>
        </Container>
      </footer>
      <FavouritesSidebar />
    </div>
  );
}

export default SearchPage;
