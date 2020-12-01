import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux";

const Logout = ({ logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-danger my-2 my-sm-0"
    >
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
