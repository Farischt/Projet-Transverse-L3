import axios from "axios"

export const listAllOrders = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`)
}

export const updateOrderStatus = async (orderId, newOrderStatus) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/admin/orders/${orderId}`,
    { newOrderStatus }
  )
}
