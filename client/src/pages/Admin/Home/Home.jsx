import React, { useState, useEffect } from "react"
import Spinner from "react-bootstrap/Spinner"
import Sales from "./Sales"

const Home = () => {
  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1> Votre tableau de bord </h1>
      <Sales />
      <hr />
    </div>
  )
}

export default Home
