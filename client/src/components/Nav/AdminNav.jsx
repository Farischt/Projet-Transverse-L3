import React from "react";
import { Link } from "react-router-dom";

const AdminNav = ({ url }) => {
  return (
    <nav className="bg-dark rounded-bottom">
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to={`${url}`} className="nav-link text-info ">
            Accueil
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
      </ul>
    </nav>
  );
};

export default AdminNav;
