import PropTypes from 'prop-types'
import '../styles/PropertyCard.css'

function PropertyCard({ property }) {
  // Format price with commas and £ symbol
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`
  }

  // Format date added
  const formatDate = (dateObj) => {
    return `${dateObj.month} ${dateObj.year}`
  }

  return (
    <div className="property-card">
      {/* Property Image */}
      <div className="property-card__image-container">
        <img 
          src={property.picture} 
          alt={property. location}
          className="property-card__image"
        />
        <span className="property-card__badge">
          {property.type}
        </span>
      </div>

      {/* Property Details */}
      <div className="property-card__content">
        {/* Location */}
        <h3 className="property-card__location">
          {property.location}
        </h3>

        {/* Property Info */}
        <div className="property-card__info">
          <span className="property-card__bedrooms">
            🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ?  's' : ''}
          </span>
          <span className="property-card__separator">•</span>
          <span className="property-card__tenure">
            {property.tenure}
          </span>
        </div>

        {/* Price */}
        <p className="property-card__price">
          {formatPrice(property.price)}
        </p>

        {/* Short Description */}
        <p className="property-card__description">
          {property.description. substring(0, 120)}...
        </p>

        {/* Date Added */}
        <p className="property-card__date">
          Added: {formatDate(property.added)}
        </p>

        {/* Action Buttons */}
        <div className="property-card__actions">
          <button className="property-card__btn property-card__btn--primary">
            View Details →
          </button>
          <button 
            className="property-card__btn property-card__btn--favourite"
            aria-label="Add to favourites"
          >
            ♡
          </button>
        </div>
      </div>
    </div>
  )
}

// PropTypes for validation
PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number. isRequired,
    price: PropTypes.number.isRequired,
    tenure: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    picture: PropTypes. string.isRequired,
    url: PropTypes.string,
    added: PropTypes.shape({
      month: PropTypes. string.isRequired,
      day: PropTypes.number.isRequired,
      year: PropTypes. number.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PropertyCard