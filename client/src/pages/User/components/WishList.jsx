import React, { useState, useEffect } from "react"
import {
  getWishList,
  addToWishList,
  removeFromWishList,
} from "../../../api/user"
import Spinner from "react-bootstrap/Spinner"

const WishList = () => {
  const [wishList, setWishList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    getWishList()
      .then((res) => {
        if (isSubscribed) {
          setWishList(res.data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setLoading(false)
          console.log(err.message)
          if (err.response.status === 400) {
            setError(err.response.data.errorMessage)
          } else {
            setError("Une erreur est survenu, lors du chargement des produits")
          }
        }
      })
    return () => (isSubscribed = false)
  }, [])

  const loadWishList = async () => {
    try {
      setLoading(true)
      const res = await getWishList()
      setWishList(res.data)
    } catch (err) {
      setLoading(false)
      console.log(err.message)
      if (err.response.status === 400) {
        setError(err.response.data.errorMessage)
      } else {
        setError("Une erreur est survenu, lors du chargement des produits")
      }
    }
  }

  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1>Votre wishlist</h1>
      {loading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : error ? (
        <h5 className="text-center"> {error} </h5>
      ) : wishList.length > 0 ? (
        wishList.map((product) => {
          return <p key={product._id}> {product.name} </p>
        })
      ) : (
        "Une erreur inconnue est survenu !"
      )}
    </div>
  )
}

export default WishList
