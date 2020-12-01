import React, { useState } from "react";
import CategoryUpdateModal from "./CategoryUpdateModal";
import { EditOutlined } from "@ant-design/icons";

const CategoryUpdate = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary m-2 my-sm-0 float-right"
        onClick={() => setModalShow(true)}
      >
        <EditOutlined />
      </button>
      <CategoryUpdateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={props.slug}
        reload={props.reload}
      />
    </>
  );
};

export default CategoryUpdate;
