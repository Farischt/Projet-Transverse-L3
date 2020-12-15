import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import {
  UserOutlined,
  SettingOutlined,
  HomeTwoTone,
  ShoppingTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons"

import Login from "./Login"
import Logout from "./Logout"
import SearchBar from "./SearchBar"

const NavBar = () => {
  let { user } = useSelector((state) => ({
    ...state,
  }))

  return (
    <Navbar static="top" collapseOnSelect expand="xl" bg="main" variant="dark">
      <Navbar.Brand className="text-white">Formations & Logiciels</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            <HomeTwoTone twoToneColor="#17a2b7" /> <br />
          </Link>
          <Link to="/shop" className="nav-link">
            <ShoppingTwoTone twoToneColor="#17a2b7" />
          </Link>
          <Link to="/cart" className="nav-link">
            <ShoppingCartOutlined style={{ color: "#17a2b7" }} />
          </Link>
          {user && user.isLoggedIn && user.user.userRole === "admin" && (
            <Link to="/admin/dashboard" className="nav-link">
              <SettingOutlined style={{ color: "#17a2b7" }} />
            </Link>
          )}
          {user && user.isLoggedIn && (
            <>
              <Link to="/user/dashboard" className="nav-link">
                <UserOutlined style={{ color: "#17a2b7" }} />
              </Link>
              <Link to="/" className="nav-link">
                <Logout />
              </Link>
            </>
          )}
        </Nav>
        {user && !user.isLoggedIn && !user.loading && <Login />}
        {user && user.loading && (
          <div className="text-center">
            <Spinner animation="border" variant="info" />
          </div>
        )}
        <SearchBar />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
