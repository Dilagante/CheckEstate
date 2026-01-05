import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PropertyCard from "./PropertyCard";
import "../styles/PropertyList.css";

function PropertyList({ properties = [], loading = false }) {
  const [sortBy, setSortBy] = useState("default");
  const [sortedProperties, setSortedProperties] = useState([]);

  // Sort properties based on selected option
  useEffect(() => {
    let sorted = [...properties];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "bedrooms-low":
        sorted.sort((a, b) => a.bedrooms - b.bedrooms);
        break;
      case "bedrooms-high":
        sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case "newest":
        sorted.sort((a, b) => {
          const dateA = new Date(
            a.added.year,
            getMonthNumber(a.added.month),
            a.added.day
          );
          const dateB = new Date(
            b.added.year,
            getMonthNumber(b.added.month),
            b.added.day
          );
          return dateB - dateA;
        });
        break;
      case "oldest":
        sorted.sort((a, b) => {
          const dateA = new Date(
            a.added.year,
            getMonthNumber(a.added.month),
            a.added.day
          );
          const dateB = new Date(
            b.added.year,
            getMonthNumber(b.added.month),
            b.added.day
          );
          return dateA - dateB;
        });
        break;
      default:
        // Keep default order
        break;
    }

    setSortedProperties(sorted);
  }, [properties, sortBy]);

  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
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
    return months[monthName] || 0;
  };

  // Loading state
  if (loading) {
    return (
      <div className="property-list">
        <div className="property-list__loading">
          <div className="spinner"></div>
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  // No properties found
  if (properties.length === 0) {
    return (
      <div className="property-list">
        <div className="property-list__empty">
          <div className="empty-icon">🏠</div>
          <h3>No Properties Found</h3>
          <p>Try adjusting your search criteria to find more properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-list">
      {/* Header with count and sort */}
      <div className="property-list__header">
        <div className="property-list__count">
          <span className="count-number">{properties.length}</span>
          <span className="count-text">
            {properties.length === 1 ? "Property" : "Properties"} Found
          </span>
        </div>

        <div className="property-list__sort">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bedrooms-low">Bedrooms: Low to High</option>
            <option value="bedrooms-high">Bedrooms: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className="property-list__grid">
        {sortedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

// PropTypes for validation
PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      tenure: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      added: PropTypes.shape({
        month: PropTypes.string.isRequired,
        day: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  loading: PropTypes.bool,
};

export default PropertyList;
