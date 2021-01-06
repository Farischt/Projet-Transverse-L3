import React, { useEffect, useState, useCallback } from "react"
import ReactGa from "react-ga"
import Spinner from "react-bootstrap/Spinner"
import SingleProduct from "./SingleProduct"
import ProductCard from "../Home/components/ProductCard"
import { readProduct, listRelated } from "../../api/product"
import { CardColumns } from "react-bootstrap"

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [related, setRelated] = useState([])
  const { slug } = match.params

  const getProduct = useCallback(() => {
    setLoading(true)
    readProduct(slug)
      .then((response) => {
        setProduct(response.data)
        listRelated(response.data._id)
          .then((response) => {
            setRelated(response.data)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [slug])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  })

  return (
    <div className="container-fluid" style={{ minHeight: "90vh" }}>
      {loading ? (
        <div className="text-center">
          <Spinner
            animation="border"
            variant="info"
            role="status"
            as="span"
            style={{ marginTop: "40vh" }}
          />
          <br />
          <span className="text-info"> Chargement ... </span>
        </div>
      ) : (
        <>
          <div className="row pt-4">
            <SingleProduct product={product} />
          </div>
          <hr />
          <div className="row p-2">
            {product && product._id && related && related.length ? (
              <>
                <div className="col text-center display-4 font-weight-bold">
                  {" "}
                  Produits similaires{" "}
                </div>
                <CardColumns className="p-2">
                  {related.map((element) => {
                    return <ProductCard key={element._id} product={element} />
                  })}
                </CardColumns>
              </>
            ) : (
              <div className="col text-center display-4 font-weight-bold">
                {" "}
                Aucun produits similaires{" "}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductView
