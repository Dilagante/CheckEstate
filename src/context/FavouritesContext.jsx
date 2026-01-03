import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const FavouritesContext = createContext()

// Custom hook to use the favourites context
export const useFavourites = () => {
  const context = useContext(FavouritesContext)

  return context
}

export const FavouritesProvider = ({ children }) => {
  // Initialize from localStorage or empty array
  const [favourites, setFavourites] = useState(() => {
    try {
      const savedFavourites = localStorage.getItem('checkEstateFavourites')
      return savedFavourites ? JSON. parse(savedFavourites) : []
    } catch (error) {
      console.error('Error loading favourites from localStorage:', error)
      return []
    }
  })

  // Save to localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem('checkEstateFavourites', JSON.stringify(favourites))
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error)
    }
  }, [favourites])

  // Add property to favourites
  const addFavourite = (property) => {
    setFavourites((prev) => {
      // Check if already in favourites
      if (prev.some((fav) => fav.id === property. id)) {
        return prev
      }
      return [...prev, property]
    })
  }

  // Remove property from favourites
  const removeFavourite = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId))
  }

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([])
  }

  // Check if property is favourited
  const isFavourite = (propertyId) => {
    return favourites.some((fav) => fav.id === propertyId)
  }

  // Toggle favourite (add if not in list, remove if in list)
  const toggleFavourite = (property) => {
    if (isFavourite(property.id)) {
      removeFavourite(property.id)
    } else {
      addFavourite(property)
    }
  }

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
    isFavourite,
    toggleFavourite,
    favouritesCount: favourites.length
  }

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  )
}

FavouritesProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default FavouritesContext