import React, { Component } from "react";

import ItemList from "./ItemList";
import SearchBar from "./SearchBar";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: "#17a2b7", padding: "10px" }}
      >
        <SearchBar />
        <ItemList />
      </div>
    );
  }
}

export default Home;
