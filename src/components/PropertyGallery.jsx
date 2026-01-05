import { useState } from "react";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils/imageUrl";
import "../styles/PropertyGallery.css";

function PropertyGallery({ images = [], location }) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Fallback if no images provided
  if (!images || images.length === 0) {
    return (
      <div className="property-gallery">
        <div className="gallery-main-image">
          <div className="no-image">
            <span>📷</span>
            <p>No images available</p>
          </div>
        </div>
      </div>
    );
  }

  // Navigate to previous image
  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="property-gallery" tabIndex={0}>
      {/* Main Large Image */}
      <div className="gallery-main-image">
        <img
          src={getImageUrl(images[selectedImage])}
          alt={`${location} - Image ${selectedImage + 1}`}
          className="main-image"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="gallery-nav-button gallery-nav-button--prev"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              className="gallery-nav-button gallery-nav-button--next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === selectedImage ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getImageUrl(image)}
                alt={`${location} - Thumbnail ${index + 1}`}
              />
              {index === selectedImage && (
                <div className="thumbnail-overlay">
                  <span>✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

PropertyGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string.isRequired,
};

export default PropertyGallery;
