import React, { Component } from "react";
import axios from "axios";
import Item from "./Item";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      axiosInProgress: true,
      itemsPerPage: 2,
    };
  }

  componentDidMount = async () => {
    const res = await axios.get("/api/item");
    this.setState({ items: [...this.state.items, ...res.data] });
    this.setState({ axiosInProgress: false });
  };

  handleLike = async (id) => {
    await axios.put("/api/item/like/" + id);
    const res = await axios.get("/api/item");
    this.setState({ items: res.data });
  };

  render() {
    return (
      <div
        className="ui divided items"
        style={{
          backgroundColor: "#17a2b7",
          padding: "15px",
          borderRadius: "20px",
        }}
      >
        {this.state.axiosInProgress ? (
          <div className="ui active centered inline loader"></div>
        ) : (
          this.state.items.map((item) => {
            return (
              <Item key={item._id} element={item} like={this.handleLike} />
            );
          })
        )}
      </div>
    );
  }
}

export default ItemList;
