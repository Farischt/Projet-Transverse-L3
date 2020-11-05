import React, { Component } from "react";

import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";

const Home = () => {
  return (
    <div
      className="container"
      style={{ /* backgroundColor: "#17a2b7",*/ padding: "10px" }}
    >
      <SearchBar />
      <ItemList />
    </div>
  );
};

export default Home;
