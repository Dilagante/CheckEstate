import { useFavourites } from '../context/FavouritesContext'
import '../styles/Header.css'

function Header() {
  const { favouritesCount, openSidebar } = useFavourites()

  // Handle favourites link click
  const handleFavouritesClick = (e) => {
    e.preventDefault()
    openSidebar()
  }

  return (
    <header>
      <h1 className="title">
        <a href="/">CheckEstate</a>
      </h1>
      <nav>
        <ul className="navbarul">
          <li className="navbarlink">
            <a href="#search">Search</a>
          </li>
          <li className="navbarlink">
            <a href="#favourites" onClick={handleFavouritesClick} className="favourites-link">
              Favourites
              {favouritesCount > 0 && (
                <span className="favourites-count"> {favouritesCount}</span>
              )}
            </a>
          </li>
          <li className="navbarlink">
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header