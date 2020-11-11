import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default UserRoute;
