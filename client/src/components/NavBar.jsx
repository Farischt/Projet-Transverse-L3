import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import Login from "./Login";
import Logout from "./Logout";

import "../css/NavBar.css";

const NavBar = () => {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <Navbar className="color-nav" fixed="top" collapseOnSelect expand="lg">
      <Navbar.Brand>Formations & Logiciels</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            {" "}
            Accueil{" "}
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link">
            {" "}
            Test{" "}
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link">
            {" "}
            Catégorie{" "}
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link">
            {" "}
            <i className="large shopping cart icon"></i>{" "}
          </Link>
        </Nav>
        {user && !user.isLoggedIn && (
          <React.Fragment>
            <Login />
            <Link to="/register" className="nav-link">
              <button className="btn btn-info my-2 my-sm-0">
                {" "}
                S'inscrire{" "}
              </button>
            </Link>
          </React.Fragment>
        )}

        {user && user.isLoggedIn && (
          <React.Fragment>
            <Logout />
            <Link to="/user/dashboard" className="nav-link">
              <button className="btn btn-info my-2 my-sm-0">
                {" "}
                <i className="user outline icon"></i>Mon profil
              </button>
            </Link>
          </React.Fragment>
        )}

        {user && user.isLoggedIn && user.role === "admin" && (
          <Link to="/admin/dashboard">
            {" "}
            <button className="btn btn-info my-2 my-sm-0">
              {" "}
              <i className="user outline icon"></i>Admin
            </button>
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
