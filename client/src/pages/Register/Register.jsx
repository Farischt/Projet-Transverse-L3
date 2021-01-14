import React, { useState, useEffect } from "react"
import ReactGa from "react-ga"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

import axios from "axios"

import "../../css/Register.css"

const Register = ({ history }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
  })

  let { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    if (user.isLoggedIn) history.push("/")
  }, [user, history])

  const handleInputChange = (event) => {
    const user = {
      ...userInfo,
      [event.target.name]: event.target.value,
    }
    setUserInfo(() => user)
  }

  const handleRegister = async () => {
    try {
      await axios.post("/api/user/register", userInfo)
      toast.dark(" Votre inscription est enrigistré !")
      ReactGa.event({
        category: "User",
        action: "User created an account",
      })
      history.push("/")
    } catch (err) {
      toast.error(" Votre inscription n'a pas été enrigistré !")
    }
  }

  return (
    user &&
    !user.IsLoggedIn && (
      <div className="form-signin mt-4">
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
        <button
          onClick={handleRegister}
          className="btn btn-lg btn-main btn-block"
          type="submit"
        >
          S'inscrire
        </button>
        <p className="mt-5 mb-3 text-muted" style={{ textAlign: "center" }}>
          &copy; 2020-2020
        </p>
      </div>
    )
  )
}

export default Register
