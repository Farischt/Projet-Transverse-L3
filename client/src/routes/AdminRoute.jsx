import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { ok, setOk } = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (user && userIsLoggedIn) {
        try {
          await axios.get("/api/user/admin");
          setOk(true);
        } catch (err) {
          setOk(false);
        }
      }
    };
    getCurrentUser();
  }, [user]);

  return (
    <Route
      {...rest}
      render={(props) => (ok ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};
export default UserRoute;
