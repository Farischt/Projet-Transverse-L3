import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

import Login from "./Login";
import Logout from "./Logout";

const NavBar = () => {
  let { user } = useSelector((state) => ({
    ...state,
  }));

  return (
    <Navbar fixed="top" collapseOnSelect expand="xl" bg="light" variant="light">
      <Navbar.Brand>Formations & Logiciels</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link text-secondary">
            Accueil
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/b" className="nav-link text-secondary">
            bababa
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link text-secondary">
            {" "}
            Test{" "}
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link text-secondary">
            <li> Catégorie </li>
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/cart" className="nav-link text-secondary">
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
              <Link to="/register" className="nav-link text-secondary">
                <button className="btn btn-outline-info my-2 my-sm-0">
                  {" "}
                  S'inscrire{" "}
                </button>
              </Link>
            </Nav>
          </>
        )}
        {user && user.isLoggedIn && user.user.userRole === "admin" && (
          <Nav className="mr-auto">
            <Link to="/admin/dashboard" className="nav-link text-secondary">
              <button className="btn btn-outline-info my-2 my-sm-0">
                <SettingOutlined />
              </button>
            </Link>
          </Nav>
        )}
        {user && user.isLoggedIn && (
          <>
            <Nav className="mr-auto">
              <Link to="/user/dashboard" className="nav-link text-secondary">
                <button className="btn btn-outline-info my-2 my-sm-0">
                  <UserOutlined />
                </button>
              </Link>
            </Nav>
            <Nav className="mr-auto">
              <Link to="/">
                <Logout />
              </Link>
            </Nav>
          </>
        )}
        {user && user.loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
