import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import UserNav from "../../components/UserNav";

const UserPassword = () => {
  let { user } = useSelector((state) => ({ ...state }));

  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const userInput = {
      ...userInfo,
      [event.target.name]: event.target.value,
    };
    setUserInfo(() => userInput);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.put("/api/user/password", user._id);
      setIsLoading(false);
      toast.success(" Votre mot de passe a été modifié ");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(" Une erreur est survenu !");
    }
  };

  return (
    <form className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          {" "}
          <UserNav />{" "}
        </div>
        <div className="col">
          {!isLoading && (
            <div className="form-inline mt-2 mt-md-0">
              <div>
                <input
                  onChange={handleInputChange}
                  className="form-control mr-sm-2"
                  type="password"
                  name="currentPassword"
                  placeholder=" Mot de passe actuel "
                />
                <input
                  onChange={handleInputChange}
                  className="form-control mr-sm-2"
                  type="password"
                  name="newPassword"
                  placeholder=" Nouveau mot de passe "
                />
                <input
                  onChange={handleInputChange}
                  className="form-control mr-sm-2"
                  type="password"
                  name="repeatPassword"
                  placeholder=" Nouveau mot de passe"
                />
                <button className="btn btn-info my-2 my-sm-0">
                  Changez de mot de passe
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="ui active dimmer">
              <div className="ui massive text loader">Chargement...</div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserPassword;
