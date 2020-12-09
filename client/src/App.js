import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactGa from "react-ga";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/User/UserDashboard";
import UserRoute from "./routes/UserRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ProductView from "./pages/Product/ProductView";
import Error404 from "./pages/404/Error404";

import { currentUser } from "./redux";
import { connect } from "react-redux";

const App = ({ currentUser }) => {
  ReactGa.initialize(process.env.REACT_APP_GA_ID, {
    cookieDomain: "auto",
    debug: false,
  });

  useEffect(() => {
    currentUser();
  }, [currentUser]);

  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer newestOnTop={false} />
      <div>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Register} path="/register" exact />
          <Route component={ProductView} path="/product/:slug" exact />
          <UserRoute component={UserDashboard} path="/user/dashboard" />
          <AdminRoute component={AdminDashboard} path="/admin/dashboard" />
          <Route component={Error404} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentUser: () => dispatch(currentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
