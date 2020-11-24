import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AdminNav from "../../components/Nav/AdminNav";
import CategoryCreate from "./Category/CategoryCreate";

const AdminDashboard = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav url={url} />
        </div>
        <div className="col">
          <Switch>
            <Route path={`${path}`} exact>
              Votre Dashboard Administrateur
            </Route>
            <Route component={CategoryCreate} path={`${path}/categories`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
