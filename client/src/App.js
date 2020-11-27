import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "antd/dist/antd.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/User/UserDashboard";
import UserRoute from "./routes/UserRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import { currentUser } from "./redux";
import { connect } from "react-redux";

const App = ({ userData, currentUser }) => {
  useEffect(() => {
    currentUser();
  }, [currentUser]);

  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer newestOnTop={false} />
      <Switch>
        <React.Fragment>
          <div style={{ marginTop: "12vh" }}>
            {/*className="container-fluid"*/}
            {/* <Route component={Home} path="/" exact /> */}
            <Route component={Register} path="/register" exact />
            <UserRoute component={UserDashboard} path="/user/dashboard" />
            <AdminRoute component={AdminDashboard} path="/admin/dashboard" />
          </div>
        </React.Fragment>
      </Switch>
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
