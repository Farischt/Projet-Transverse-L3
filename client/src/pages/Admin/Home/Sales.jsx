import React, { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { listPagination } from "../../../api/product"
import Spinner from "react-bootstrap/Spinner"

const Stats = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])

  const sort = "sold"
  const order = "desc"
  const page = 1

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) setLoading(true)
    listPagination(sort, order, page)
      .then((res) => {
        if (isSubscribed) {
          res.data.forEach((product) => {
            const data = {
              name: product.name,
              sales: product.sold,
              // quantity: product.quantity,
            }
            setProducts((previousState) => [...previousState, data])
          })
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          if (err.response.status === 400) {
            setError(err.response.data.errorMessage)
          } else {
            setError("Une erreur inconnue est survenu")
          }
          setLoading(false)
        }
      })
    return () => (isSubscribed = false)
  }, [])

  return (
    <>
      {loading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : products.length ? (
        <div className="text-center p-4" style={{ width: "100%", height: 300 }}>
          <h5> Les plus vendus </h5>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={products}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#000c18" />
              {/* <Bar dataKey="quantity" fill="#18a2b6" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h3> {error} </h3>
      )}
    </>
  )
}

export default Stats
