import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { getImageUrl } from "../utils/imageUrl";
import PropTypes from "prop-types";
import "../styles/PropertyCard.css";

function PropertyCard({ property }) {
  //Save favourites context
  const { isFavourite, toggleFavourite, addFavourite } = useFavourites();
  const favourited = isFavourite(property.id);

  // Format price with commas and £ symbol
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Format date added
  const formatDate = (dateObj) => {
    return `${dateObj.month} ${dateObj.year}`;
  };

  // Handle favourite button click
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    toggleFavourite(property);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e) => {
    // Store property data in drag event
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(property));

    // Add dragging class for visual feedback
    e.currentTarget.classList.add("is-dragging");

    // Optional: Create custom drag image
    const dragImage = e.currentTarget.querySelector(".property-card__image");
    if (dragImage) {
      e.dataTransfer.setDragImage(dragImage, 50, 50);
    }
  };

  const handleDragEnd = (e) => {
    // Remove dragging class
    e.currentTarget.classList.remove("is-dragging");
  };

  return (
    <div
      className="property-card"
      draggable="true" // ✅ Make card draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Property Image */}
      <Link
        to={`/property/${property.id}`}
        className="property-card__image-link"
      >
        <div className="property-card__image-container">
          <img
            src={getImageUrl(property.picture)}
            alt={property.location}
            className="property-card__image"
            draggable="false"
          />
          <span className="property-card__badge">{property.type}</span>
        </div>
      </Link>

      {/* Property Details */}
      <div className="property-card__content">
        {/* Location */}
        <Link
          to={`/property/${property.id}`}
          className="property-card__location-link"
        >
          <h3 className="property-card__location">{property.location}</h3>
        </Link>

        {/* Property Info */}
        <div className="property-card__info">
          <span className="property-card__bedrooms">
            🛏️ {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
          </span>
          <span className="property-card__separator">•</span>
          <span className="property-card__tenure">{property.tenure}</span>
        </div>

        {/* Price */}
        <p className="property-card__price">{formatPrice(property.price)}</p>

        {/* Short Description */}
        <p className="property-card__description">
          {property.description.substring(0, 120)}...
        </p>

        {/* Date Added */}
        <p className="property-card__date">
          Added: {formatDate(property.added)}
        </p>

        {/* Action Buttons */}
        <div className="property-card__actions">
          <Link
            to={`/property/${property.id}`}
            className="property-card__btn property-card__btn--primary"
          >
            View Details →
          </Link>
          <button
            className={`property-card__btn property-card__btn--favourite ${
              favourited ? "is-favourited" : ""
            }`}
            onClick={handleFavouriteClick}
            aria-label={
              favourited ? "Remove from favourites" : "Add to favourites"
            }
            title={favourited ? "Remove from favourites" : "Add to favourites"}
          >
            {favourited ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes for validation
PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    tenure: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    url: PropTypes.string,
    added: PropTypes.shape({
      month: PropTypes.string.isRequired,
      day: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PropertyCard;
