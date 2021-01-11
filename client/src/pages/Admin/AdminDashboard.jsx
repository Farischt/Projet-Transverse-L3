import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import AdminNav from "../../components/Nav/AdminNav"
import Home from "./Home/Home"
import Order from "./Orders/Order"
import CategoryContainer from "./Category/CategoryContainer"
import ProductContainer from "./Product/ProductContainer"
import CouponContainer from "./Coupon/CouponContainer"

const AdminDashboard = () => {
  let { path, url } = useRouteMatch()
  return (
    <div className="overflow-hidden">
      <div className="row bg-main">
        <div className="col-md-2">
          <AdminNav url={url} />
        </div>
        <div className="col-md-10 ">
          <Switch>
            <Route component={Home} path={`${path}`} exact />
            <Route component={Order} path={`${path}/orders`} exact />
            <Route component={CategoryContainer} path={`${path}/categories`} />
            <Route component={ProductContainer} path={`${path}/products`} />
            <Route component={CouponContainer} path={`${path}/coupons`} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
