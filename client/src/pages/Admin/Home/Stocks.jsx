import React, { useState, useEffect } from "react"
import { stocks } from "../../../api/admin"
import Spinner from "react-bootstrap/Spinner"
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

const Stocks = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) setLoading(true)
    stocks()
      .then((res) => {
        if (isSubscribed) {
          res.data.forEach((product) => {
            const data = {
              name: product.name,
              quantity: product.quantity,
            }
            setData((previousState) => [...previousState, data])
            setLoading(false)
          })
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setError(err.response.data.errorMessage)
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
      ) : data.length ? (
        <div className="text-center p-4" style={{ width: "100%", height: 300 }}>
          <h5> Rupture de stock </h5>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={data}
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
              <Bar dataKey="quantity" fill="#18a2b6" />
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

export default Stocks
