import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import UserNav from "../../components/UserNav"
import Home from "./components/Home"
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
            <Route component={Home} path={`${path}`} exact />

            <Route component={Password} path={`${path}/password`} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
