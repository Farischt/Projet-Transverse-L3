import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { setDrawerHidden, removeProductFromCart } from "../redux"
import { Drawer } from "antd"

const SideDrawer = ({
  cartData,
  drawerData,
  setDrawerHidden,
  removeProductFromCart,
}) => {
  let history = useHistory()

  const redirectToCart = () => {
    if (history.location.pathname !== "/cart") {
      history.push("/cart")
      setDrawerHidden()
    }
  }

  return (
    <Drawer
      visible={drawerData.visibility}
      onClose={(e) => {
        e.preventDefault()
        setDrawerHidden()
      }}
      getContainer={false}
      title={`Votre panier (${cartData.length})`}
      closable={false}
    >
      <div className="row">
        <div className="col">
          <button className="btn btn-block btn-info" onClick={redirectToCart}>
            {" "}
            Vers votre panier{" "}
          </button>
          {cartData &&
            cartData.map((product) => {
              return (
                <div className="border rounded mt-2" key={product._id}>
                  <img
                    className="img-fluid rounded-top"
                    src={product.images[0].url}
                    style={{ width: "100%", objectFit: "cover" }}
                    alt=""
                  />
                  <li className="list-group-item d-flex justify-content-between align-items-center px-3">
                    <strong> {product.name} </strong> {product.userQuantity}
                  </li>
                  <button
                    className="btn btn-block btn-danger"
                    onClick={() => removeProductFromCart(product)}
                  >
                    {" "}
                    Retirer{" "}
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </Drawer>
  )
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
    drawerData: state.drawer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDrawerHidden: () => dispatch(setDrawerHidden()),
    removeProductFromCart: (product) =>
      dispatch(removeProductFromCart(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer)
