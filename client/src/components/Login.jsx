import React, { useState } from "react";
import "../css/Buttons.css";

const Login = (props) => {
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

  return (
    <div className="form-inline mt-2 mt-md-0">
      {props.userName ? (
        <span style={{ color: "white" }}> Bienvenue {props.userName} </span>
      ) : (
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
            className="form-control mr-sm-2"
            type="password"
            name="password"
            placeholder="Mot de passe"
          />
          <button
            onClick={() => props.login(user)}
            className="btn btn-info my-2 my-sm-0"
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
