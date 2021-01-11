import React from "react"
import { Link } from "react-router-dom"

const AdminNav = ({ url }) => {
  return (
    <nav className="p-3 rounded-bottom">
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to={`${url}`} className="nav-link text-info ">
            Accueil
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/orders`} className="nav-link text-info">
            Commandes
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/categories`} className="nav-link text-info">
            Catégories
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/products`} className="nav-link text-info">
            Produits
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/coupons`} className="nav-link text-info">
            Coupons
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
