import React, { Component } from "react";
import "../css/Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "",
        email: "",
        password: "",
        repeatedPassword: "",
      },
    };
  }

  handleInputChange = (event) => {
    const userInfo = {
      ...this.state.userInfo,
      [event.target.name]: event.target.value,
    };
    this.setState(() => ({ userInfo }));
  };

  render() {
    return (
      <div className="form-signin" style={{ backgroundColor: "#353a40" }}>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          {" "}
          Inscrivez-vous !{" "}
        </h1>
        <input
          onChange={this.handleInputChange}
          name="name"
          type="text"
          className="form-control"
          placeholder="Prénom"
          required
          autoFocus
        />
        <input
          onChange={this.handleInputChange}
          name="email"
          type="email"
          className="form-control"
          placeholder="Adresse e-mail"
          required
        />
        <input
          onChange={this.handleInputChange}
          name="password"
          type="password"
          className="form-control"
          placeholder="Mot de passe"
          required
        />
        <input
          onChange={this.handleInputChange}
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
          onClick={() => this.props.register(this.state.userInfo)}
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
    );
  }
}

export default Register;
