import React from "react"
import CouponCreate from "./CouponCreate"
import CouponList from "./CouponList"

const CouponContainer = () => {
  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <CouponCreate />
      <hr />
      <CouponList />
    </div>
  )
}

export default CouponContainer
