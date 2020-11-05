import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDataFromApi = async () => {
      setIsLoading(true);
      const res = await axios.get("/api/item");
      try {
        const userLikes = await axios.get("/api/item/liked");
        setLikedItems(userLikes.data);
      } catch (err) {
        setLikedItems([]);
      }
      setItems(res.data);
      setIsLoading(false);
    };
    getDataFromApi();
  }, []);

  const handleLike = async (id) => {
    await axios.post("/api/item/like/" + id);
    const res = await axios.get("/api/item");
    const userLikes = await axios.get("/api/item/liked");
    setItems(res.data);
    setLikedItems(userLikes.data);
  };

  return (
    <div
      className="ui divided items"
      style={{
        padding: "15px",
      }}
    >
      {!isLoading ? (
        items.map((item) => {
          return <Item key={item._id} element={item} like={handleLike} />;
        })
      ) : (
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className="ui massive text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default ItemList;
