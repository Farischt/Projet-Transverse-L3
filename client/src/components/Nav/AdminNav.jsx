import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to="/admin/dashboard" className="nav-link">
            {" "}
            Accueil{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/admin/dashboard/products" className="nav-link">
            {" "}
            Produits{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/admin/dashboard/categories" className="nav-link">
            {" "}
            Catégories{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/admin/dashboard/sub-categories" className="nav-link">
            {" "}
            Sous catégories{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/admin/dashboard/coupons" className="nav-link">
            {" "}
            Codes promo{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
