import React, { useState, useEffect } from "react"
import { listPagination, productsTotal } from "../../../api/product"
import ProductCard from "./ProductCard"
import ProductLoading from "./ProductLoading"
import CardColumns from "react-bootstrap/CardColumns"
import { Pagination } from "antd"

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [countProducts, setCountProducts] = useState(1)
  const perPage = 6
  const sort = "createdAt"
  const order = "desc"

  useEffect(() => {
    let isSubscribed = true
    productsTotal().then((res) => {
      if (isSubscribed) setCountProducts(res.data)
    })

    return () => (isSubscribed = false)
  }, [])

  useEffect(() => {
    let isSubscribed = true
    setProductsLoading(true)
    listPagination(sort, order, page)
      .then((response) => {
        if (isSubscribed) {
          setProducts(response.data)
          setProductsLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setProductsLoading(false)
          console.log(err)
        }
      })

    return () => (isSubscribed = false)
  }, [page])

  return (
    <div className="container pb-3">
      <h1 className="text-center text-info font-weight-bold p-4">
        Nos formations les plus récentes
      </h1>
      <CardColumns className="shadow-lg mb-5 p-2 rounded">
        {productsLoading ? (
          <ProductLoading count={perPage} />
        ) : products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />
          })
        ) : (
          <div className="text-center">
            <h5 className="font-weight-bold"> Aucun produit disponible </h5>
          </div>
        )}
      </CardColumns>

      <div className="text-center">
        {" "}
        <Pagination
          current={page}
          total={(countProducts / perPage) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  )
}

export default NewArrivals
