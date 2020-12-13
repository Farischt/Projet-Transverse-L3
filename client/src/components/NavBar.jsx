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
} from "@ant-design/icons"

import Login from "./Login"
import Logout from "./Logout"
import SearchBar from "./SearchBar"

const NavBar = () => {
  let { user } = useSelector((state) => ({
    ...state,
  }))

  return (
    <Navbar static="top" collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Navbar.Brand className="text-white">Formations & Logiciels</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            <HomeTwoTone twoToneColor="#17a2b7" />
          </Link>
          <Link to="/efzfez" className="nav-link">
            <ShoppingTwoTone twoToneColor="#17a2b7" />
          </Link>
        </Nav>
        <SearchBar />

        {user && !user.isLoggedIn && !user.loading && <Login />}
        {user && user.isLoggedIn && user.user.userRole === "admin" && (
          <Link to="/admin/dashboard" className="m-2">
            <button className="btn btn-outline-info my-2 my-sm-0">
              <SettingOutlined />
            </button>
          </Link>
        )}
        {user && user.isLoggedIn && (
          <>
            <Link to="/user/dashboard" className="m-2">
              <button className="btn btn-outline-info my-2 my-sm-0">
                <UserOutlined />
              </button>
            </Link>

            <Link to="/" className="m-2">
              <Logout />
            </Link>
          </>
        )}
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
