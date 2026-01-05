import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const FavouritesContext = createContext();

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  return context;
};

export const FavouritesProvider = ({ children }) => {
  // Existing favourites state
  const [favourites, setFavourites] = useState(() => {
    try {
      const savedFavourites = localStorage.getItem("checkEstateFavourites");
      return savedFavourites ? JSON.parse(savedFavourites) : [];
    } catch (error) {
      console.error("Error loading favourites from localStorage:", error);
      return [];
    }
  });

  // NEW:  Sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save to localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem("checkEstateFavourites", JSON.stringify(favourites));
    } catch (error) {
      console.error("Error saving favourites to localStorage:", error);
    }
  }, [favourites]);

  // Add property to favourites
  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  // Remove property from favourites
  const removeFavourite = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  // Check if property is favourited
  const isFavourite = (propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  };

  // Toggle favourite
  const toggleFavourite = (property) => {
    if (isFavourite(property.id)) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  //Open sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  //Close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  //Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
    isFavourite,
    toggleFavourite,
    favouritesCount: favourites.length,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

FavouritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FavouritesContext;
