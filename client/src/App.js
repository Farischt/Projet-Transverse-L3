import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function getUserFromApi() {
      const res = await axios.get("/api/user/me");
      setUserId(res.data.userId);
      setUserName(res.data.userName);
    }
    getUserFromApi();
  }, []);

  const login = async (userInfo) => {
    const log = await axios.post("/api/user/login", userInfo);
    const res = await axios.get("/api/user/me");
    setUserId(log.data.user);
    setUserName(res.data.userName);
  };

  const register = async (userInfo) => {
    try {
      await axios.post("/api/user/register", userInfo);
      toast.info("You are registrated !");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const logout = async () => {
    await axios.get("/api/user/logout");
    setUserId(null);
    setUserName(null);
  };

  //render() {
  return (
    <Switch>
      <React.Fragment>
        <NavBar login={login} userName={userName} />
        <ToastContainer />
        <div
          className="container"
          style={{ /*backgroundColor: "#17a2b7",*/ marginTop: "10vh" }}
        >
          <button onClick={logout}> Log out </button>
          <Route path="/" exact component={Home} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} register={register} />}
          />
        </div>
      </React.Fragment>
    </Switch>
  );
  //}
};

export default App;
