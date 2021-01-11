import React, { useState, useEffect } from "react"
import { listAllOrders } from "../../../api/admin"
import Spinner from "react-bootstrap/Spinner"
import UpdateOrderStatus from "./UpdateOrderStatus"
import OrderProductDetails from "./OrderProductDetails"

const Order = () => {
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    setOrdersLoading(true)
    listAllOrders()
      .then((res) => {
        if (isSubscribed) {
          setOrders(res.data)
          setOrdersLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err)
          setOrdersLoading(false)
        }
      })

    return () => (isSubscribed = false)
  }, [])

  const loadOrders = () => {
    setOrdersLoading(true)
    listAllOrders()
      .then((res) => {
        setOrders(res.data)
        setOrdersLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setOrdersLoading(false)
      })
  }

  const isOrderNew = (orderDate) => {
    const dateDay = new Date(orderDate).getDay()
    const dateMonth = new Date(orderDate).getMonth()

    const today = Date.now()
    const todayDay = new Date(today).getDay()
    const todayMonth = new Date(today).getMonth()

    if (dateDay === todayDay && dateMonth === todayMonth) return true
    return false
  }

  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1> Vos commandes </h1>
      {ordersLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : orders.length && orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div className="m-5 p-3 card" key={order._id}>
              <h4 className="text-center">
                {isOrderNew(order.createdAt) && (
                  <span className="badge bg-warning text-white float-left">
                    New
                  </span>
                )}{" "}
                Commande n° <strong>{order._id}</strong>{" "}
              </h4>
              <div className="text-center">
                Statut de la commande :{" "}
                <span className="badge bg-warning text-white">
                  {" "}
                  {order.orderStatus}
                </span>
                <br />
                Date de commande : {new Date(order.createdAt).toLocaleString()}
                <br />
                Prix :{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(order.paymentIntent.amount / 100)}
                <br />
                Commandé par : {order.orderedBy.name}
                <br />
                Adresse mail : {order.orderedBy.email}
                <hr />
                <OrderProductDetails order={order} />
              </div>
              <UpdateOrderStatus order={order} loadOrders={loadOrders} />
            </div>
          )
        })
      ) : (
        <h5 className="text-center"> Aucune commande disponible </h5>
      )}
    </div>
  )
}

export default Order
