import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import AdminNav from "../../components/Nav/AdminNav"
import CategoryContainer from "./Category/CategoryContainer"
import ProductContainer from "./Product/ProductContainer"

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
            <Route path={`${path}`} exact>
              <div
                className="col p-4 bg-light rounded"
                style={{ minHeight: "90vh" }}
              >
                Votre compte
              </div>
            </Route>
            <Route component={CategoryContainer} path={`${path}/categories`} />
            <Route component={ProductContainer} path={`${path}/products`} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
