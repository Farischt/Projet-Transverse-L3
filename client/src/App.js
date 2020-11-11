import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/User/UserDashboard";
import UserRoute from "./routes/UserRoute";
import UserSettings from "./pages/User/UserSettings";
import UserPassword from "./pages/User/UserPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

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
          role: res.data.userRole,
          _id: res.data.userId,
          isLoggedIn: true,
          likedItems: userLikes.data,
        },
      });
      toast.info(` Heureux de vous revoir ${res.data.userName}`);
    }
    getUserFromApi();
  }, [dispatch]);

  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <Switch>
        <React.Fragment>
          <div className="container-fluid" style={{ marginTop: "12vh" }}>
            <Route component={Home} path="/" exact />
            <Route component={Register} path="/register" exact />
            <UserRoute component={UserDashboard} path="/user/dashboard" exact />
            <UserRoute
              component={UserPassword}
              path="/user/dashboard/password"
              exact
            />
            <UserRoute
              component={UserSettings}
              path="/user/dashboard/settings"
              exact
            />
            <AdminRoute
              component={AdminDashboard}
              path="/admin/dashboard"
              exact
            />
          </div>
        </React.Fragment>
      </Switch>
    </React.Fragment>
  );
};

export default App;
