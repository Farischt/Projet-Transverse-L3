import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AdminNav from "../../components/Nav/AdminNav";
import CategoryContainer from "./Category/CategoryContainer";
import ProductContainer from "./Product/ProductContainer";

const AdminDashboard = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="overflow-hidden">
      <div className="row bg-dark">
        <div className="col-md-2 bg-dark">
          <AdminNav url={url} />
        </div>
        <div className="col-md-10 ">
          <Switch>
            <Route path={`${path}`} exact>
              Votre Dashboard Administrateur
            </Route>
            <Route component={CategoryContainer} path={`${path}/categories`} />
            <Route component={ProductContainer} path={`${path}/products`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
