import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/NavBar.css";

const NavBar = () => {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <Navbar className="color-nav" fixed="top" collapseOnSelect expand="lg">
      <Navbar.Brand>Formation & Logiciels</Navbar.Brand>
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
        {!user.isLoggedIn && (
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

        {user.isLoggedIn && user.name && (
          <React.Fragment>
            <Link to="/profil" className="nav-link">
              <button className="btn btn-info my-2 my-sm-0">
                {" "}
                <i className="user outline icon"></i>Mon profil
              </button>
            </Link>
            <Logout />
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
