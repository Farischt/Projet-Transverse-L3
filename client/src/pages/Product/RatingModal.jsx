import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { rateProduct } from "../../api/product"
import Login from "../../components/Login"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import StarRatings from "react-star-ratings"

const RatingModal = ({ product, ...props }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [rate, setRate] = useState(0)
  const [rateLoading, setRateLoading] = useState(0)

  useEffect(() => {
    if (
      product &&
      product.ratings &&
      product.ratings.length > 0 &&
      user &&
      user.isLoggedIn
    ) {
      const rate = product.ratings.find(
        (element) => element.postedBy === user.user.userId
      )

      if (rate) {
        setRate(rate.star)
      }
    }
  }, [product, user])

  const handleStarClick = async (newRating, productId) => {
    setRateLoading(true)
    try {
      await rateProduct(parseInt(newRating), productId)
      // getProduct() // memory leak !
      setRateLoading(false)
      toast(`Merci pour votre retour`)
      setRate(newRating)
    } catch (err) {
      console.log(err)
      setRateLoading(false)
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notez le produit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {user && user.isLoggedIn && !rateLoading ? (
            <StarRatings
              name={product._id}
              rating={rate}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="45px"
              starSpacing="10px"
              isSelectable={true}
              changeRating={handleStarClick}
            />
          ) : rateLoading ? (
            <div className="text-center">
              <Spinner
                animation="border"
                variant="info"
                role="status"
                as="span"
              />
              <br />
              <span className="text-info"> Chargement ... </span>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RatingModal
