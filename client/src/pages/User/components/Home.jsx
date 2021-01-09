import React, { useState, useEffect } from "react"
import { listOrders } from "../../../api/user"
import Spinner from "react-bootstrap/Spinner"
import OrderProductDetails from "./OrderProductDetails"
import OrderPaymentDetails from "./OrderPaymentDetails"
import Invoice from "./Invoice"

const Home = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    listOrders()
      .then((res) => {
        if (isSubscribed) {
          setOrders(res.data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err)
          setOrders([])
          setLoading(false)
        }
      })
    return () => (isSubscribed = false)
  }, [])

  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1> Vos commandes </h1>

      {loading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : orders.length && orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div className="m-5 p-3 card" key={order._id}>
              <h4 className="text-center">
                {" "}
                Commande n° <strong>{order._id}</strong>{" "}
              </h4>
              <div className="text-center">
                Statut de la commande :{" "}
                <span className="badge bg-warning text-white">
                  {" "}
                  {order.orderStatus}
                </span>{" "}
              </div>
              <OrderPaymentDetails order={order} />
              <OrderProductDetails order={order} />
              <div className="text-center">
                <Invoice order={order} />
              </div>
            </div>
          )
        })
      ) : (
        <h5 className="text-center"> Aucune commande disponible </h5>
      )}
    </div>
  )
}

export default Home
