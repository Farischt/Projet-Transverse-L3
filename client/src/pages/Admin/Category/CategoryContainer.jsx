import React from "react";

import CategoryList from "./CategoryList";
import CategoryCreate from "./CategoryCreate";

const CategoryContainer = () => {
  return (
    <div className="col p-4 bg-light rounded">
      <CategoryCreate />
      <div className="ui divider"></div>
      <CategoryList />
    </div>
  );
};

export default CategoryContainer;
