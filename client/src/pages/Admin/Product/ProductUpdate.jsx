import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import ProductUpdateModal from "./ProductUpdateModal";

const ProductUpdate = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className="btn btn-outline-info my-2 my-sm-0 float-right"
        onClick={() => setModalShow(true)}
      >
        <EditOutlined />
      </button>
      <ProductUpdateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </>
  );
};

export default ProductUpdate;
