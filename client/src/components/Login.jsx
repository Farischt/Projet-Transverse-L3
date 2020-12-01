import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
//import { toast } from "react-toastify";
import "../css/Buttons.css";
import { connect } from "react-redux";
import { loginUser } from "../redux";

const Login = ({ userData, loginUser }) => {
  // let history = useHistory();

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

  // const roleRedirect = (res) => {
  //   if (res.data.userRole === "admin") history.push("/admin/dashboard");
  // };

  const handleLogin = () => {
    loginUser(user);
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
