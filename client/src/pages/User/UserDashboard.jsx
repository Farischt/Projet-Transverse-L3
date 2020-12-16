import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import UserNav from "../../components/UserNav"
import Password from "./components/Password"

const UserDashboard = () => {
  let { path, url } = useRouteMatch()

  return (
    <div className="overflow-hidden">
      <div className="row bg-main">
        <div className="col-md-2 ">
          <UserNav url={url} />
        </div>
        <div className="col-md-10">
          <Switch>
            <Route path={`${path}`} exact>
              <div
                className="col p-4 bg-light rounded"
                style={{ minHeight: "90vh" }}
              >
                Votre compte
              </div>
            </Route>
            <Route component={Password} path={`${path}/password`} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
