import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import Badge from "react-bootstrap/Badge"
import {
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"

import Login from "./Login"
import Logout from "./Logout"
import SearchBar from "./SearchBar"

const NavBar = () => {
  let { user, cart } = useSelector((state) => ({
    ...state,
  }))

  return (
    <Navbar static="top" collapseOnSelect expand="xl" bg="main" variant="dark">
      <Navbar.Brand className="text-white">Formations & Logiciels</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link  text-center text-info ">
            <HomeOutlined /> <br />
            Home
          </Link>
          <Link to="/shop" className="nav-link text-center text-info">
            <ShoppingOutlined />
            <br />
            Shop
          </Link>
          <Link to="/cart" className="nav-link text-center text-info">
            <ShoppingCartOutlined />
            <br />
            Cart{" "}
            {cart && cart.length > 0 && (
              <Badge variant="danger">{cart.length}</Badge>
            )}
          </Link>
          {user && user.isLoggedIn && user.user.userRole === "admin" && (
            <Link
              to="/admin/dashboard"
              className="nav-link text-center text-info"
            >
              <SettingOutlined /> <br /> Admin
            </Link>
          )}
          {user && user.isLoggedIn && (
            <>
              <Link
                to="/user/dashboard"
                className="nav-link text-center text-info"
              >
                <UserOutlined /> <br /> Profil
              </Link>

              <Logout />
            </>
          )}
        </Nav>
        <SearchBar isButton={true} />
        {user && !user.isLoggedIn && !user.loading && <Login />}
        {user && user.loading && (
          <div className="text-center">
            <Spinner animation="border" variant="info" />
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
