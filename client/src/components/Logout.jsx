import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Logout = (props) => {
  let dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      console.log(props);
      dispatch({
        type: "LOGOUT",
        payload: {
          name: null,
          _id: null,
          role: null,
          isLoggedIn: false,
          likedItems: null,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-info my-2 my-sm-0">
      <i className="power off icon"></i> Deconnexion{" "}
    </button>
  );
};

export default Logout;
