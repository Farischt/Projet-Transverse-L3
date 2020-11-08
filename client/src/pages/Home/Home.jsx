import React from "react";

import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <ItemList />
    </div>
  );
};

export default Home;
