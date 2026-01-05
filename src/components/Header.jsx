import { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import "../styles/Header.css";

function Header() {
  const { favouritesCount, openSidebar } = useFavourites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle favourites link click
  const handleFavouritesClick = (e) => {
    e.preventDefault();
    openSidebar();
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <h1 className="title">
        <a href="/CheckEstate/">CheckEstate</a>
      </h1>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="navbarul">
          <li className="navbarlink">
            <a href="#search" onClick={handleLinkClick}>
              Search
            </a>
          </li>
          <li className="navbarlink">
            <a
              href="#favourites"
              onClick={handleFavouritesClick}
              className="favourites-link"
            >
              Favourites
              {favouritesCount > 0 && (
                <span className="favourites-count">{favouritesCount}</span>
              )}
            </a>
          </li>
          <li className="navbarlink">
            <a href="#about" onClick={handleLinkClick}>
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;
