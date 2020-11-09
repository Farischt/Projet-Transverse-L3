import React, { useState, useEffect } from "react";

import axios from "axios";

import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDataFromApi = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/item");
        setItems(res.data);
        setIsLoading(false);
      } catch (err) {
        setItems([]);
        setIsLoading(false);
      }
    };
    getDataFromApi();
  }, []);

  return (
    <div
      className="ui divided items"
      style={{
        padding: "15px",
      }}
    >
      {items.length > 0 &&
        items.map((item) => {
          return <Item key={item._id} element={item} />;
        })}

      {isLoading && (
        <div className="ui active dimmer">
          <div className="ui massive text loader">Chargement...</div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
