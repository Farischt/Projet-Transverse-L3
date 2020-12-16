import React, { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

const Password = () => {
  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event) => {
    const userInput = {
      ...userInfo,
      [event.target.name]: event.target.value,
    }
    setUserInfo(() => userInput)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios.put("/api/user/password", userInfo)
      setIsLoading(false)
      toast.success(" Votre mot de passe a été modifié ")
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      toast.error(" Une erreur est survenu !")
    }
  }

  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1> Modification de mot de passe </h1>
      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <div className="form-row ">
            <div className="form-group col-md-4">
              <input
                onChange={handleInputChange}
                type="password"
                className="form-control"
                name="currentPassword"
                placeholder="Mot de passe actuel"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                onChange={handleInputChange}
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                onChange={handleInputChange}
                type="password"
                className="form-control"
                name="repeatPassword"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <button className="btn btn-second my-2 my-sm-0" type="submit">
                {" "}
                Modifier le mot de passe{" "}
              </button>
            </div>
          </div>
        </form>
      )}

      {isLoading && (
        <div className="ui active dimmer">
          <div className="ui massive text loader">Chargement...</div>
        </div>
      )}
    </div>
  )
}

export default Password
