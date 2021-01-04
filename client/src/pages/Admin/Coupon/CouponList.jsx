import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Spinner from "react-bootstrap/Spinner"
import { DeleteOutlined } from "@ant-design/icons"
import { getCoupons, removeCoupon } from "../../../api/coupon"

const CouponList = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const [couponsLoading, setCouponsLoading] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    setCouponsLoading(true)
    getCoupons()
      .then((response) => {
        if (isSubscribed) {
          setCoupons(response.data)
          setCouponsLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err.message)
          setCouponsLoading(false)
        }
      })
    return () => (isSubscribed = false)
  }, [])

  const handleDelete = async (couponId) => {
    if (
      window.confirm(
        "Attention, vous êtes sur le point de supprimer un coupon ! Voulez-vous continuer ?"
      )
    ) {
      setLoading(true)
      try {
        const removedCoupon = await removeCoupon(couponId)
        toast.info(
          `Le coupon ${removedCoupon.data.title} a été supprimé avec succès`
        )
        // const coupons = await getCoupons()
        // setCoupons(coupons.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        if (err.response.status === 400)
          toast.error(err.response.data.errorMessage)
        else toast.error("Une erreur est survenue ")
      }
    }
  }

  return (
    <>
      <h1> Liste de coupons </h1>
      {couponsLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : coupons.length > 0 ? (
        coupons.map((coupon) => {
          return (
            <li
              key={coupon._id}
              className="list-group-item d-flex justify-content-between align-items-center px-3"
            >
              <strong> {coupon.title} </strong>
              <strong> {coupon.discount}% </strong>{" "}
              <strong>
                {" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(coupon.expiry))}
              </strong>
              <button
                onClick={() => handleDelete(coupon._id)}
                className="btn btn-danger my-2 my-sm-0"
              >
                {loading ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  <DeleteOutlined />
                )}
              </button>
            </li>
          )
        })
      ) : (
        "Aucun coupon disponible"
      )}
    </>
  )
}

export default CouponList
