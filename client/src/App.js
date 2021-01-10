import React, { useEffect, lazy, Suspense } from "react"
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Spinner from "react-bootstrap/Spinner"
import ReactGa from "react-ga"
import { currentUser } from "./redux"
import { connect } from "react-redux"
import "react-toastify/dist/ReactToastify.css"

const Home = lazy(() => import("./pages/Home/Home"))
const Register = lazy(() => import("./pages/Register/Register"))
const NavBar = lazy(() => import("./components/NavBar"))
const Footer = lazy(() => import("./components/Footer/Footer"))
const UserDashboard = lazy(() => import("./pages/User/UserDashboard"))
const UserRoute = lazy(() => import("./routes/UserRoute"))
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"))
const AdminRoute = lazy(() => import("./routes/AdminRoute"))
const ProductView = lazy(() => import("./pages/Product/ProductView"))
const ShopContainer = lazy(() => import("./pages/Shop/ShopContainer"))
const CartView = lazy(() => import("./pages/Cart/CartView"))
const CheckOut = lazy(() => import("./pages/CheckOut/CheckOut"))
const Payment = lazy(() => import("./pages/Payment/Payment"))
const Error404 = lazy(() => import("./pages/404/Error404"))
const SideDrawer = lazy(() => import("./components/SideDrawer"))

const App = ({ currentUser }) => {
  ReactGa.initialize(process.env.REACT_APP_GA_ID, {
    cookieDomain: "auto",
    debug: false,
  })

  useEffect(() => {
    currentUser()
  }, [currentUser])

  return (
    <Suspense
      fallback={
        <div className="text-center p-5">
          {" "}
          <h1>
            {" "}
            Chargement... <br />
            <Spinner animation="border" variant="dark" />{" "}
          </h1>{" "}
        </div>
      }
    >
      <NavBar />
      <SideDrawer />
      <ToastContainer newestOnTop={false} />
      <div>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Register} path="/register" exact />
          <Route component={ProductView} path="/product/:slug" exact />
          <Route component={ShopContainer} path="/shop" exact />
          <Route component={CartView} path="/cart" exact />
          <UserRoute component={CheckOut} path="/checkout" exact />
          <UserRoute component={UserDashboard} path="/user/dashboard" />
          <UserRoute component={Payment} path="/payment" />
          <AdminRoute component={AdminDashboard} path="/admin/dashboard" />
          <Route component={Error404} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentUser: () => dispatch(currentUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
