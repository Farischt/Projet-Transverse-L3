import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const App = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    async function getUserFromApi() {
      const res = await axios.get("/api/user/me");
      const userLikes = await axios.get("/api/item/liked");
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: res.data.userName,
          _id: res.data.userId,
          isLoggedIn: true,
          likedItems: userLikes.data,
        },
      });
      toast.info(` Bienvenue ${res.data.userName}`);
    }
    getUserFromApi();
  }, [dispatch]);

  return (
    <Switch>
      <React.Fragment>
        <NavBar />
        <ToastContainer />
        <div
          className="container"
          style={{ /*backgroundColor: "#17a2b7",*/ marginTop: "10vh" }}
        >
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default App;
