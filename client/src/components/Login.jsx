import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: "",
        password: "",
      },
      isError: false,
      errorMessage: "",
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
      <div className="form-inline mt-2 mt-md-0">
        {this.props.userName ? (
          <span style={{ color: "white" }}>
            {" "}
            Bienvenue {this.props.userName}{" "}
          </span>
        ) : (
          <div>
            <input
              onChange={this.handleInputChange}
              className="form-control mr-sm-2"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={this.handleInputChange}
              className="form-control mr-sm-2"
              type="password"
              name="password"
              placeholder="Mot de passe"
            />
            <button
              onClick={() => this.props.login(this.state.userInfo)}
              className="btn btn-info my-2 my-sm-0"
            >
              Se connecter
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
