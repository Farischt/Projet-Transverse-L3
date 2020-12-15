import React, { useState } from "react"
import RatingModal from "./RatingModal"
import Button from "react-bootstrap/Button"
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons"

const ProductButtons = ({ product }) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div className="text-center">
      <Button variant="outline-info" className="m-3 rounded float-left">
        <ShoppingCartOutlined /> <br /> Panier
      </Button>
      <Button variant="outline-danger" className="m-3 rounded ">
        <HeartOutlined /> <br /> Save
      </Button>
      <Button
        variant="outline-golden"
        className="m-3 rounded float-right"
        onClick={() => setModalShow(true)}
      >
        <StarOutlined /> <br /> Note
      </Button>
      <RatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </div>
  )
}

export default ProductButtons
