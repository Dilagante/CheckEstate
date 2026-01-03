import '../styles/Header.css'

function Header({ favouritesCount = 0 }) {
  return (
<header>
      <h1 className="title">
        <a href="home.html">CheckEstate</a>
      </h1>
      <nav>
        <ul className="navbarul">
          <li className="navbarlink">
            <a href="#" target="_blank">Search</a>
          </li>
          <li className="navbarlink">
            <a href="#" target="_blank">Favourites</a>
          </li>
          <li className="navbarlink">
            <a href="#" target="_blank">About</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header