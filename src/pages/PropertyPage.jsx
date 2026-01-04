import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Header from "../components/Header";
import PropertyGallery from "../components/PropertyGallery";
import FavouritesSidebar from "../components/FavouritesSidebar";
import { useFavourites } from "../context/FavouritesContext";
import propertiesData from "../data/properties.json";
import PropertyTabs from "../components/PropertyTabs";
import "../styles/PropertyPage.css";

function PropertyPage() {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useFavourites();

  // Find the property with this ID
  const property = propertiesData.properties.find((p) => p.id === id);

  // Check if this property is favourited
  const favourited = property ? isFavourite(property.id) : false;

  // ✅ Scroll to top when property changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]); // Re-run when property ID changes

  // If property not found
  if (!property) {
    return (
      <div className="property-page">
        <Header favouritesCount={0} />
        <Container className="property-not-found">
          <div className="not-found-content">
            <h1>🏠 Property Not Found</h1>
            <p>Sorry, we couldn't find the property you're looking for.</p>
            <Link to="/" className="btn btn-primary">
              ← Back to Search
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Format price
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Handle favourite button click
  const handleFavouriteClick = () => {
    toggleFavourite(property);
  };

  return (
    <div className="property-page">
      {/* Header/Navbar */}
      <Header />

      {/* Back Button */}
      <Container className="property-page__back">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          ← Back to Results
        </Button>
      </Container>

      {/* Property Header */}
      <section className="property-header">
        <Container>
          <div className="property-header__content">
            <div className="property-header__text">
              <span className="property-badge">{property.type}</span>
              <h1 className="property-title">{property.location}</h1>
              <p className="property-subtitle">
                🛏️ {property.bedrooms} Bedroom {property.type} •{" "}
                {property.tenure}
              </p>
            </div>
            <div className="property-header__price">
              <p className="price-label">Price</p>
              <p className="price-value">{formatPrice(property.price)}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="property-content">
        <Container>
          <div className="property-layout">
            {/* Left Column - Image & Details */}
            <div className="property-main">
              {/* Property Gallery */}
              <PropertyGallery
                images={property.images || [property.picture]}
                location={property.location}
              />

              {/* Tabs */}
              <div className="property-tabs-section">
                <PropertyTabs property={property} />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="property-sidebar">
              <div className="sidebar-card">
                <h3>Property Details</h3>
                <ul className="property-details-list">
                  <li>
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">
                      {formatPrice(property.price)}
                    </span>
                  </li>
                  <li>
                    <span className="detail-label">Bedrooms:</span>
                    <span className="detail-value">{property.bedrooms}</span>
                  </li>
                  <li>
                    <span className="detail-label">Property Type:</span>
                    <span className="detail-value">{property.type}</span>
                  </li>
                  <li>
                    <span className="detail-label">Tenure: </span>
                    <span className="detail-value">{property.tenure}</span>
                  </li>
                  <li>
                    <span className="detail-label">Added:</span>
                    <span className="detail-value">
                      {property.added.month} {property.added.year}
                    </span>
                  </li>
                </ul>

                <div className="sidebar-actions">
                  {/* Updated Favourite Button with Logic */}
                  <button
                    className={`btn-favourite-large ${
                      favourited ? "is-favourited" : ""
                    }`}
                    onClick={handleFavouriteClick}
                    aria-label={
                      favourited
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    title={
                      favourited
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    {favourited
                      ? "♥ Remove from Favourites"
                      : "♡ Add to Favourites"}
                  </button>
                  <button className="btn-contact">📧 Contact Agent</button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <FavouritesSidebar />
    </div>
  );
}

export default PropertyPage;
