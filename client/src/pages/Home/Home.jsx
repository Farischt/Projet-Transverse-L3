import React, { useState, useEffect } from "react";
import ReactGa from "react-ga";
import Jumbotron from "./components/Jumbotron";
import NewArrivals from "./components/NewArrivals";
import BestSellers from "./components/BestSellers";

const Home = () => {
  useEffect(() => {
    ReactGa.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <div className="jumbotron text-center text-info h1 font-weight-bold">
        <Jumbotron
          text={[
            "Besoin d'une formation dynamique ?",
            "Vous êtes au bon endroit !",
          ]}
        />
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
  );
};

export default Home;
