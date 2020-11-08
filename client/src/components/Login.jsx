import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../css/Buttons.css";

const Login = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const [userr, setUserr] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const userInfo = {
      ...userr,
      [event.target.name]: event.target.value,
    };
    setUserr(() => userInfo);
  };

  const roleRedirect = (res) => {
    if (res.data.userRole === "admin") history.push("/admin/dashboard");
    else history.push("/user/dashboard");
  };

  const handleLogin = async () => {
    const login = await axios.post("/api/user/login", userr);
    const getUser = await axios.get("/api/user/me");
    const userLikes = await axios.get("/api/item/liked");
    dispatch({
      type: "LOGGED_IN_USER",
      payload: {
        name: getUser.data.userName,
        role: getUser.data.userRole,
        _id: login.data.user,
        isLoggedIn: true,
        likedItems: userLikes.data,
      },
    });
    roleRedirect(getUser);
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
          className="form-control mr-sm-2"
          type="password"
          name="password"
          placeholder="Mot de passe"
        />
        <button onClick={handleLogin} className="btn btn-info my-2 my-sm-0">
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Login;
