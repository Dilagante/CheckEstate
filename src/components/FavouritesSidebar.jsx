import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import '../styles/FavouritesSidebar.css'

function FavouritesSidebar() {
  const { 
    favourites, 
    removeFavourite, 
    clearFavourites, 
    favouritesCount,
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  } = useFavourites()

  // Format price
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`
  }

  // Handle remove favourite
  const handleRemove = (propertyId, e) => {
    e.preventDefault()
    e.stopPropagation()
    removeFavourite(propertyId)
  }

  // Handle clear all
  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to remove all ${favouritesCount} favourite properties?`)) {
      clearFavourites()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`favourites-toggle ${isSidebarOpen ? 'is-open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle favourites sidebar"
        title="View favourites"
      >
        <span className="favourites-icon">♥</span>
        {favouritesCount > 0 && (
          <span className="favourites-count-badge">{favouritesCount}</span>
        )}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="favourites-overlay" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`favourites-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        {/* Header */}
        <div className="favourites-sidebar__header">
          <h2 className="favourites-sidebar__title">
            <span className="title-icon">♥</span>
            Favourites
            <span className="title-count">({favouritesCount})</span>
          </h2>
          <button 
            className="close-button"
            onClick={closeSidebar}
            aria-label="Close favourites"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="favourites-sidebar__content">
          {favourites.length === 0 ? (
            // Empty State
            <div className="favourites-empty">
              <div className="empty-icon">♡</div>
              <h3>No Favourites Yet</h3>
              <p>Click the heart icon on any property to add it to your favourites</p>
            </div>
          ) : (
            // Favourites List
            <>
              <div className="favourites-list">
                {favourites.map((property) => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="favourite-item"
                    onClick={closeSidebar}
                  >
                    {/* Property Image */}
                    <div className="favourite-item__image">
                      <img 
                        src={property.picture} 
                        alt={property.location}
                      />
                      <span className="favourite-item__type">{property.type}</span>
                    </div>

                    {/* Property Info */}
                    <div className="favourite-item__info">
                      <h4 className="favourite-item__location">
                        {property.location}
                      </h4>
                      <p className="favourite-item__price">
                        {formatPrice(property.price)}
                      </p>
                      <p className="favourite-item__details">
                        🛏️ {property.bedrooms} bed • {property.tenure}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="favourite-item__remove"
                      onClick={(e) => handleRemove(property.id, e)}
                      aria-label="Remove from favourites"
                      title="Remove from favourites"
                    >
                      ✕
                    </button>
                  </Link>
                ))}
              </div>

              {/* Clear All Button */}
              <div className="favourites-sidebar__footer">
                <button 
                  className="clear-all-button"
                  onClick={handleClearAll}
                >
                  Clear All Favourites
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

export default FavouritesSidebar