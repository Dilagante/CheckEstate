import { useFavourites } from '../context/FavouritesContext'
import '../styles/Header.css'

function Header() {
  const { favouritesCount } = useFavourites()

  return (
    <header>
      <h1 className="title">
        <a href="/">CheckEstate</a>
      </h1>
      <nav>
        <ul className="navbarul">
          <li className="navbarlink">
            <a href="/">Search</a>
          </li>
          <li className="navbarlink">
            <a href="#favourites">
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