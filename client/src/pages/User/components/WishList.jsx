import React, { useState, useEffect } from "react"
import { getWishList, removeFromWishList } from "../../../api/user"
import Spinner from "react-bootstrap/Spinner"
import CardColumns from "react-bootstrap/CardColumns"
import ProductCard from "../../Home/components/ProductCard"
import { toast } from "react-toastify"

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
      setLoading(false)
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

  const handleRemoveFromWishList = async (productId) => {
    try {
      const response = await removeFromWishList(productId)
      if (response.data.ok) {
        loadWishList()
      }
    } catch (err) {
      if ((err.response.status = 400)) {
        toast.error(err.response.data.errorMessage)
      } else {
        toast.error("Une erreur inconnue est survenu")
      }
    }
  }

  return (
    <div className="col p-3 bg-light rounded" style={{ minHeight: "90vh" }}>
      <h1>Votre wishlist</h1>
      {loading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : error ? (
        <h5 className="text-center"> {error} </h5>
      ) : wishList.length > 0 ? (
        <CardColumns>
          {wishList.map((product) => {
            return (
              <div key={product._id}>
                <ProductCard product={product} key={product._id} />

                <button
                  className="btn btn-danger btn-block "
                  onClick={() => handleRemoveFromWishList(product._id)}
                >
                  {" "}
                  Retirer{" "}
                </button>
              </div>
            )
          })}
        </CardColumns>
      ) : (
        "Une erreur inconnue est survenu !"
      )}
    </div>
  )
}

export default WishList
