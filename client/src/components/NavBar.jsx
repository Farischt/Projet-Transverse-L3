import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import styles from "../css/NavBar.module.css";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = () => {
  let { user } = useSelector((state) => ({
    ...state,
  }));

  return (
    <Navbar
      className={styles.nav}
      fixed="top"
      collapseOnSelect
      expand="xl"
      variant="light"
    >
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
          <>
            <Nav className="mr-auto">
              <Login />
            </Nav>
            <Nav className="mr-auto">
              <Link to="/register" className="nav-link">
                <button className="btn btn-primary my-2 my-sm-0">
                  {" "}
                  S'inscrire{" "}
                </button>
              </Link>
            </Nav>
          </>
        )}
        {user && user.isLoggedIn && user.user.userRole === "admin" && (
          <Nav className="mr-auto">
            <Link to="/admin/dashboard">
              {" "}
              <button className="btn btn-primary my-2 my-sm-0"> Admin</button>
            </Link>
          </Nav>
        )}
        {user && user.isLoggedIn && (
          <>
            <Nav className="mr-auto">
              <Link to="/user/dashboard" className="nav-link">
                <button className="btn btn-primary my-2 my-sm-0">
                  Profile
                </button>
              </Link>
            </Nav>
            <Nav className="mr-auto">
              <Logout />
            </Nav>
          </>
        )}
        {user && user.loading && (
          <div className="ui active dimmer">
            <div className="ui massive text loader">Chargement...</div>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
