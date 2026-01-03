import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/PropertyGallery.css'


function PropertyGallery({ images = [], location }) {
  const [selectedImage, setSelectedImage] = useState(0)

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
    )
  }

  return (
    <div className="property-gallery">
      {/* Main Large Image */}
      <div className="gallery-main-image">
        <img 
          src={images[selectedImage]} 
          alt={`${location} - Image ${selectedImage + 1}`}
          className="main-image"
        />
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img 
              src={image} 
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
    </div>
  )
}

PropertyGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string.isRequired,
}

export default PropertyGallery