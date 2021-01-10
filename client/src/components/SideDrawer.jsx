import React from "react"
import { connect } from "react-redux"
import { setDrawerVisible, setDrawerHidden } from "../redux"
import { Drawer } from "antd"

const SideDrawer = ({ cartData, drawerData, setDrawerHidden }) => {
  return (
    <Drawer
      visible={drawerData.visibility}
      onClose={setDrawerHidden}
      title={`Votre panier (${cartData.length})`}
    >
      {" "}
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio dicta
      repellendus voluptatum, nesciunt deleniti nostrum asperiores pariatur ex
      laboriosam culpa ipsa sit assumenda laudantium incidunt reiciendis
      reprehenderit, rem, quaerat esse?{" "}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer)
