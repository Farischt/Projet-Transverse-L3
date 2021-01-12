import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { addProductToCart, setDrawerVisible } from "../../redux"
import { addToWishList } from "../../api/user"
import RatingModal from "./RatingModal"
import Button from "react-bootstrap/Button"
import { Tooltip } from "antd"
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { toast } from "react-toastify"

const ProductButtons = ({
  product,
  addProductToCart,
  cartData,
  setDrawerVisible,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const [toolTip, setToolTip] = useState("Ajouter au panier")

  useEffect(() => {
    const checkInCart = cartData.find((element) => element._id === product._id)
    if (checkInCart) {
      setToolTip("Déjà dans votre panier")
    }
  }, [cartData, product._id])

  const handleAddToCart = () => {
    addProductToCart(product)
    setDrawerVisible()
  }

  const handleAddToWishList = async () => {
    try {
      const response = await addToWishList(product._id)
      if (response.data.ok)
        toast.info(`Le produit ${product.name} à été ajouté à votre wishlist`)
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data.errorMessage)
      } else {
        toast.error("Une erreur inconnue est survenu")
      }
    }
  }

  return (
    <div className="text-center">
      <Tooltip placement="bottom" title={toolTip}>
        <Button
          variant="outline-info"
          className="m-3 rounded float-left"
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {" "}
          <ShoppingCartOutlined /> <br /> Panier
        </Button>
      </Tooltip>
      <Button
        variant="outline-danger"
        className="m-3 rounded"
        onClick={handleAddToWishList}
      >
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

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product)),
    setDrawerVisible: () => dispatch(setDrawerVisible()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductButtons)
