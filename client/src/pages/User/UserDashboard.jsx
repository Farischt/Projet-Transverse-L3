import React from "react";
import UserNav from "../../components/UserNav";

const UserDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {" "}
          <UserNav />{" "}
        </div>
        <div className="col">
          <h1> Dashboard </h1>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
