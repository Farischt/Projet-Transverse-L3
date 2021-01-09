import React from "react"
import { updateOrderStatus } from "../../../api/admin"

const UpdateOrderStatus = ({ order, loadOrders }) => {
  const handleUpdate = (newOrderStatus) => {
    updateOrderStatus(order._id, newOrderStatus)
      .then((res) => {
        if (res.data.ok) {
          loadOrders()
        }
      })
      .catch((err) => {
        console.log("UNE ERREUR EST SURVENU")
      })
  }

  return (
    <div className="text-center">
      {" "}
      {order.orderStatus === "Not processed" && (
        <button
          className="btn btn-success"
          onClick={() => handleUpdate("Processing")}
        >
          {" "}
          Confirmer la commande{" "}
        </button>
      )}
      {order.orderStatus === "Processing" && (
        <button
          className="btn btn-danger"
          onClick={() => handleUpdate("Completed")}
        >
          {" "}
          Terminer la commande{" "}
        </button>
      )}{" "}
      {order.orderStatus === "Cancelled" && (
        <button className="btn btn-main" disabled>
          {" "}
          Commande annulé{" "}
        </button>
      )}
      {order.orderStatus === "Completed" && (
        <button className="btn btn-main" disabled>
          {" "}
          Commande terminé{" "}
        </button>
      )}
    </div>
  )
}

export default UpdateOrderStatus
