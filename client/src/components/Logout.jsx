import React from "react";
import ReactGa from "react-ga";
import { connect } from "react-redux";
import { logoutUser } from "../redux";

const Logout = ({ logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
    ReactGa.event({
      category: "User",
      action: "User logged-out",
    });
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger my-2 my-sm-0">
      Déconnexion
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
