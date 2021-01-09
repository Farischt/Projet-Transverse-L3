import React from "react"
import { Link } from "react-router-dom"

const UserNav = ({ url }) => {
  return (
    <nav className="p-3">
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to={url} className="nav-link text-info">
            Accueil
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/password`} className="nav-link text-info">
            {" "}
            Mot de passe{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/wishlist`} className="nav-link text-info">
            {" "}
            Wish List{" "}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
