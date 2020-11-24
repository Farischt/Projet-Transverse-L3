import React from "react";
import { Link } from "react-router-dom";

const AdminNav = ({ url }) => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to={`${url}`} className="nav-link">
            Accueil
          </Link>
        </li>
        <li className="nav-items">
          <Link to={`${url}/categories`} className="nav-link">
            Catégories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
