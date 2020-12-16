import React from "react"
import ReactGa from "react-ga"
import { connect } from "react-redux"
import { logoutUser } from "../redux"
import { PoweroffOutlined } from "@ant-design/icons"

const Logout = ({ logoutUser }) => {
  const handleLogout = () => {
    logoutUser()
    ReactGa.event({
      category: "User",
      action: "User logged-out",
    })
  }

  return (
    <div
      onClick={handleLogout}
      className="nav-link text-center text-danger"
      style={{ cursor: "pointer" }}
    >
      <PoweroffOutlined /> <br />
      Off
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
