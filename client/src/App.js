import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Register from "./components/Register";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null,
    };
  }

  componentDidMount = async () => {
    const res = await axios.get("/api/user/me");
    this.setState({ userId: res.data.userId });
    this.setState({ userName: res.data.userName });
  };

  login = async (userInfo) => {
    await axios.post("/api/user/login", userInfo);
    const res = await axios.get("/api/user/me");
    this.setState({ userId: res.data.userId });
    this.setState({ userName: res.data.userName });
  };

  register = async (userInfo) => {
    await axios.post("/api/user/register", userInfo);
  };

  render() {
    return (
      <div
        className="App"
        style={{ backgroundColor: "#17a2b7", height: "90vh" }}
      >
        <Router>
          <NavBar login={this.login} userName={this.state.userName} />

          <div
            className="container"
            style={{ backgroundColor: "#17a2b7", marginTop: "10vh" }}
          >
            <Route
              path="/register"
              exact
              render={(props) => (
                <Register {...props} register={this.register} />
              )}
            />
            <Route path="/" exact component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
