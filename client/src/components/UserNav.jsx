import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav style={{ backgroundColor: "black", color: "white" }}>
      <ul className="nav flex-column">
        <li className="nav-items">
          <Link to="/user/dashboard" className="nav-link">
            {" "}
            Accueil{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/user/dashboard/password" className="nav-link">
            {" "}
            Mot de passe{" "}
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/user/dashboard/settings" className="nav-link">
            {" "}
            Paramètres{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
