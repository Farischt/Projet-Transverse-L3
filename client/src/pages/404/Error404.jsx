import React from "react"
import { Link } from "react-router-dom"
import error from "../../img/error.png"

const Error404 = () => {
  return (
    <div className="container text-center">
      <h2 className="pt-3">
        {" "}
        Il semble que vous vous soyez perdu en chemin !{" "}
        <Link to="/" className="text-info">
          {" "}
          Page d'accueil{" "}
        </Link>
      </h2>
      <img
        src={error}
        className="img-fluid"
        style={{ height: "70vh", objectFit: "cover" }}
        alt="404"
      />
    </div>
  )
}

export default Error404
