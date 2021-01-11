import React, { useEffect } from "react"
import ReactGa from "react-ga"
import Jumbotron from "./components/Jumbotron"
import NewArrivals from "./components/NewArrivals"
import BestSellers from "./components/BestSellers"

const Home = () => {
  useEffect(() => {
    ReactGa.pageview(window.location.pathname)
  }, [])

  return (
    <>
      <div
        className="jumbotron text-center text-main display-3"
        style={{ borderRadius: "0px" }}
      >
        <Jumbotron
          text={[
            "Bonjour !",
            "Bienvenue sur Formations & Logiciels",
            "Besoin d'une formation dynamique ?",
            "Tu es au bon endroit !",
          ]}
        />
      </div>
      <NewArrivals />
      <div className="container">
        <hr />
      </div>
      <BestSellers />
    </>
  )
}

export default Home
