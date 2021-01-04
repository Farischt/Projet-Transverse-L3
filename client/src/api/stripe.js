import axios from "axios"

export const createPaymentIntent = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/stripe/payment-intent`
  )
}
