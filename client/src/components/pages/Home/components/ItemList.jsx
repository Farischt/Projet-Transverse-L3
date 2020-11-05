import React, { Component } from "react";
import axios from "axios";
import Item from "./Item";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      likedItems: [],
      axiosInProgress: true,
      itemsPerPage: 2,
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/item");
      this.setState({ items: [...this.state.items, ...res.data] });
      this.setState({ axiosInProgress: false });
    } catch (err) {
      console.log("error 2");
    }
    try {
      const liked = await axios.get("api/item/liked");
      this.setState({ likedItems: liked.data });
    } catch (err) {
      console.log("error 3");
    }
  };

  handleLike = async (id) => {
    const like = await axios.post("/api/item/like/" + id);
    const res = await axios.get("/api/item");
    this.setState({ items: res.data });
    /* const liked = await axios.get("api/item/liked");
    this.setState({ likedItems: liked.data });*/
    this.setState({ likedItems: [...this.state.likedItems, like.data] });
  };

  render() {
    return (
      <div
        className="ui divided items"
        style={{
          padding: "15px",
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
