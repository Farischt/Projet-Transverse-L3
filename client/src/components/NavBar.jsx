import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
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
  let { user } = useSelector((state) => ({
    ...state,
  }))

  // const [state, setState] = useState({
  //   active: true,
  //   style: "bg-primary rounded",
  // })

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
            Cart
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
              <Link to="/" className="nav-link">
                <Logout />
              </Link>
            </>
          )}
        </Nav>
        <SearchBar />
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
