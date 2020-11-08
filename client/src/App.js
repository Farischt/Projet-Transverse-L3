import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/User/UserDashboard";
import UserRoute from "./routes/UserRoute";

const App = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const roleRedirect = (res) => {
    if (res.data.userRole === "admin") history.push("/admin/dashboard");
    else history.push("/user/dashboard");
  };

  useEffect(() => {
    async function getUserFromApi() {
      const res = await axios.get("/api/user/me");
      const userLikes = await axios.get("/api/item/liked");
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: res.data.userName,
          role: res.data.userRole,
          _id: res.data.userId,
          isLoggedIn: true,
          likedItems: userLikes.data,
        },
      });
      roleRedirect(res);
      toast.info(` Heureux de vous revoir ${res.data.userName}`);
    }
    getUserFromApi();
  }, [dispatch]);

  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <Switch>
        <div className="content" style={{ marginTop: "12vh" }}>
          <Route component={Home} path="/" exact />
          <Route component={Register} path="/register" exact />
          <UserRoute component={UserDashboard} path="/user/dashboard" exact />
        </div>
      </Switch>
    </React.Fragment>
  );
};

export default App;
