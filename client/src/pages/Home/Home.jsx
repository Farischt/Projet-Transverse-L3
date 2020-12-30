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
      <div className="jumbotron text-center text-main h1 font-weight-bold">
        <Jumbotron
          text={[
            "Bienvenue sur Formations & Logiciels",
            "Besoin d'une formation dynamique ?",
            "Vous êtes au bon endroit !",
            "Ne manquez pas nos nouvelles formations !",
          ]}
        />
      </div>
      <div className="container">
        <hr />
      </div>
      <NewArrivals />
      <div className="container">
        <hr />
      </div>
      <BestSellers />
      <div className="container">
        <hr />
      </div>
    </>
  )
}

export default Home
