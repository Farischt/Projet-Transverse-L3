import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { toast } from "react-toastify"
import { createCoupon } from "../../../api/coupon"
import Spinner from "react-bootstrap/Spinner"

const CouponCreate = () => {
  const [couponName, setCouponName] = useState("")
  const [couponExpiry, setCouponExpiry] = useState(Date.now())
  const [couponDiscount, setCouponDiscount] = useState(0)

  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      await createCoupon({
        title: couponName,
        expiry: couponExpiry,
        discount: couponDiscount,
      })
      setLoading(false)
      toast.info(`Le coupon ${couponName} a été ajouté avec succès`)
    } catch (err) {
      setLoading(false)
      if (err.response.status === 400)
        toast.error(err.response.data.errorMessage)
      else toast.error("Une erreur est survenu")
    }
  }

  return (
    <>
      {" "}
      <h1> Créer une catégorie </h1>
      <div className="form-group">
        <label> Nom </label>
        <input
          onChange={(e) => setCouponName(e.target.value)}
          className="form-control my-2"
          type="text"
          value={couponName}
          placeholder="Nom du coupon"
          autoFocus
          required
        />
      </div>
      <div className="form-group">
        <label> Rabais en % </label>
        <input
          onChange={(e) => setCouponDiscount(e.target.value)}
          className="form-control my-2"
          type="number"
          min={0}
          max={90}
          value={couponDiscount}
          required
        />
      </div>
      <div className="form-group">
        <label> Date </label>
        <br />
        <DatePicker
          className="form-control"
          selected={couponExpiry}
          value={couponExpiry}
          onChange={(date) => setCouponExpiry(date)}
          required
        />
      </div>
      <button className="btn btn-primary my-2 my-sm-0" onClick={handleCreate}>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          "Enregistrer"
        )}
      </button>
    </>
  )
}

export default CouponCreate
