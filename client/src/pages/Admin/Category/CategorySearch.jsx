import React from "react";

const CategorySearch = ({ query, setQuery }) => {
  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <input
      className="form-control my-2 mr-sm-2"
      type="search"
      placeholder="Rechercher une catégorie"
      aria-label="Search"
      value={query}
      onChange={handleSearchChange}
    />
  );
};

export default CategorySearch;
