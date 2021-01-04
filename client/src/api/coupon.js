import axios from "axios"

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/coupon`)
}

export const createCoupon = async (coupon) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/coupon/create`, {
    coupon,
  })
}

export const removeCoupon = async (couponId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/coupon/remove/${couponId}`
  )
}
