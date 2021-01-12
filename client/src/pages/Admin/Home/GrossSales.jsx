import React, { useState, useEffect, useMemo } from "react"
import { getSalesPerMonth } from "../../../api/admin"
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

const GrossSales = () => {
  const month = useMemo(
    () => [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Jui",
      "Jul",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  )

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) setLoading(true)
    getSalesPerMonth()
      .then((res) => {
        if (isSubscribed) {
          res.data.forEach((value) => {
            const ca = {
              month: month[value._id.month - 1],
              year: value._id.year,
              amount: value.grossSales / 100,
            }
            setData((previousState) => [...previousState, ca])
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
  }, [month])

  return (
    <>
      <>
        {loading ? (
          <div className="text-center">
            {" "}
            <Spinner animation="border" variant="primary" />{" "}
          </div>
        ) : data.length ? (
          <div
            className="text-center p-4"
            style={{ width: "100%", height: 300 }}
          >
            <h5> Le CA par mois </h5>
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
                <XAxis dataKey="month" />
                <YAxis datakey="eur" />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#18a2b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <h3> {error} </h3>
        )}
      </>
    </>
  )
}

export default GrossSales
