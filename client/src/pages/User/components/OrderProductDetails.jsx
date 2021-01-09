import React from "react"

const OrderProductDetails = ({ order }) => (
  <div className="table-responsive p-2">
    <h3> Formations </h3>
    <table className="table table-bordered table-hover ">
      <thead className="thead-light">
        <tr>
          <th scope="col"> Nom </th>
          <th scope="col"> Quantité </th>
          <th scope="col"> Prix unitaire </th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((element, index) => {
          return (
            <tr key={index}>
              <td>
                {" "}
                <b> {element.product.name} </b>{" "}
              </td>
              <td>{element.userQuantity}</td>
              <td>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(element.product.price)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default OrderProductDetails
