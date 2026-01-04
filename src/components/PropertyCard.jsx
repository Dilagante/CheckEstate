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
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(property));

    // Create compact drag preview badge
    const dragPreview = document.createElement("div");
    dragPreview.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #6944efff 0%, #9926dcff 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 16px;
        font-weight:  600;
        box-shadow: 0 12px 40px rgba(239, 68, 68, 0.5);
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        min-width: 200px;
      ">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 16px;">
          <span style="font-size: 24px;">🏠</span>
          <span>${property.location.split(",")[0]}</span>
        </div>
        <div style="font-size:  14px; opacity: 0.9;">
          ${formatPrice(property.price)} • ${property.bedrooms} bed
        </div>
        <div style="font-size:  12px; opacity: 0.8; text-align: center; margin-top: 4px;">
          Drop on ♥ to save
        </div>
      </div>
    `;
    dragPreview.style.position = "absolute";
    dragPreview.style.top = "-10000px";

    document.body.appendChild(dragPreview);

    const preview = dragPreview.firstElementChild;
    e.dataTransfer.setDragImage(
      preview,
      preview.offsetWidth / 2,
      preview.offsetHeight / 2
    );

    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);

    e.currentTarget.classList.add("is-dragging");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("is-dragging");
  };

  return (
    <div
      className="property-card"
      draggable="true" // Make card draggable
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
