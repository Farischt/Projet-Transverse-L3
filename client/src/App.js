import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactGa from "react-ga";

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/User/UserDashboard";
import UserRoute from "./routes/UserRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ProductView from "./pages/Product/ProductView";

import { currentUser } from "./redux";
import { connect } from "react-redux";

const FourZeroFour = () => {
  return <h1> Four Zero Four </h1>;
};

const App = ({ userData, currentUser }) => {
  useEffect(() => {
    ReactGa.initialize("UA-184433004-2", {
      cookieDomain: "auto",
      debug: false,
    });
    ReactGa.pageview(window.location.pathname);
  }, []);

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
          <UserRoute component={UserDashboard} path="/user/dashboard" />
          <AdminRoute component={AdminDashboard} path="/admin/dashboard" />
          <Route exact path="/product/:slug" component={ProductView} />
          <Route component={FourZeroFour} />
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
