import React, { useState } from "react";

import ProductCreate from "./ProductCreate";

const ProductContainer = () => {
  return (
    <div className="col p-4 bg-light rounded">
      <ProductCreate />
      <hr />
    </div>
  );
};

export default ProductContainer;
