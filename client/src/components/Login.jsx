import React, { useState } from "react";
import ReactGa from "react-ga";
import { connect } from "react-redux";
import { loginUser } from "../redux";
import { Link } from "react-router-dom";

const Login = ({ userData, loginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const userInfo = {
      ...user,
      [event.target.name]: event.target.value,
    };
    setUser(() => userInfo);
  };

  const handleLogin = () => {
    loginUser(user);
    ReactGa.event({
      category: "User",
      action: "User logged-in",
    });
  };

  return (
    <div className="form-inline mt-2 mt-md-0">
      <div>
        <input
          onChange={handleInputChange}
          className="form-control mr-sm-2"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={handleInputChange}
          className="form-control my-2 mr-sm-2"
          type="password"
          name="password"
          placeholder="Mot de passe"
        />
        <button
          onClick={handleLogin}
          className="btn btn-outline-info my-2 my-sm-0"
        >
          Se connecter
        </button>
        <Link to="/register" className="m-2">
          <button className="btn btn-outline-info my-2 my-sm-0">
            {" "}
            S'inscrire{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
