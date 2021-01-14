import React, { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUser } from "../redux"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

const Login = ({ userData, loginUser }) => {
  let history = useHistory()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (event) => {
    const userInfo = {
      ...user,
      [event.target.name]: event.target.value,
    }
    setUser(() => userInfo)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    loginUser(user)
  }

  return (
    <form className="form-inline" onSubmit={handleLogin}>
      <FormControl
        onChange={handleInputChange}
        type="email"
        name="email"
        placeholder="Email"
        className="mr-sm-2 my-2"
        style={{ maxWidth: "10rem" }}
      />
      <FormControl
        onChange={handleInputChange}
        type="password"
        name="password"
        placeholder="Mot de passe"
        className="mr-sm-2 my-2"
        style={{ maxWidth: "10rem" }}
      />
      <Button variant="outline-info" type="submit" className="mr-sm-2 my-2">
        Se connecter
      </Button>
      <Button variant="outline-info" onClick={() => history.push("/register")}>
        S'inscrire
      </Button>
    </form>
    // <div className="form-inline mt-2 mt-md-0">
    //   {/* <div className="form-inline"> */}
    //   <input
    //     onChange={handleInputChange}
    //     className="form-control my-2 mr-sm-2"
    //     type="email"
    //     name="email"
    //     placeholder="Email"
    //     style={{ maxWidth: "12rem" }}
    //   />
    //   <input
    //     onChange={handleInputChange}
    //     className="form-control my-2 mr-sm-2 ml-2"
    //     type="password"
    //     name="password"
    //     placeholder="Mot de passe"
    //     style={{ maxWidth: "12rem" }}
    //   />
    //   <button
    //     onClick={handleLogin}
    //     className="btn btn-outline-info my-2 my-sm-0"
    //   >
    //     Se connecter
    //   </button>
    //   <Link to="/register" className="m-2">
    //     <button className="btn btn-outline-info my-2 my-sm-0">
    //       {" "}
    //       S'inscrire{" "}
    //     </button>
    //   </Link>
    // </div>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
