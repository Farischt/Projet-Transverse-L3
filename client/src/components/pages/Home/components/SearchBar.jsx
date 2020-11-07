import React, { Component } from "react";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <form
        className="form-inline justify-content-center"
        style={{ /*backgroundColor: "#17a2b7",*/ margin: "5vh" }}
      >
        <input
          style={{ width: "70%" }}
          onChange={this.handleInputChange}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
