import React from "react"
import GrossSales from "./GrossSales"
import Sales from "./Sales"
import Stocks from "./Stocks"

const Home = () => {
  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1> Votre tableau de bord </h1>
      <hr />
      <GrossSales />
      <hr />
      <Sales />
      <hr />
      <Stocks />
    </div>
  )
}

export default Home
