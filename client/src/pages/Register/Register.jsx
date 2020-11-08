import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";

import "../../../css/Register.css";

const Register = ({ history }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user.isLoggedIn) history.push("/");
  }, [user, history]);

  const handleInputChange = (event) => {
    const user = {
      ...userInfo,
      [event.target.name]: event.target.value,
    };
    setUserInfo(() => user);
  };

  const handleRegister = async () => {
    try {
      await axios.post("/api/user/register", userInfo);
      toast.success(" Votre inscription est enrigistré !");
      history.push("/");
    } catch (err) {
      toast.error(" Votre inscription n'a pas été enrigistré !");
    }
  };

  return (
    user &&
    !user.IsLoggedIn && (
      <div className="form-signin" style={{ backgroundColor: "white" }}>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          {" "}
          Inscrivez-vous !{" "}
        </h1>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          className="form-control"
          placeholder="Prénom"
          required
          autoFocus
        />
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          className="form-control"
          placeholder="Adresse e-mail"
          required
        />
        <input
          onChange={handleInputChange}
          name="password"
          type="password"
          className="form-control"
          placeholder="Mot de passe"
          required
        />
        <input
          onChange={handleInputChange}
          name="repeatedPassword"
          type="password"
          className="form-control"
          placeholder="Répétez votre mot de passe"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Se souvenir de moi
          </label>
        </div>
        <button
          onClick={handleRegister}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          style={{ backgroundColor: "#353a40" }}
        >
          S'inscrire
        </button>
        <p className="mt-5 mb-3 text-muted" style={{ textAlign: "center" }}>
          &copy; 2020-2020
        </p>
      </div>
    )
  );
};

export default Register;
