import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import ReactGa from "react-ga"
import { searchWithQuery } from "../../redux"
import { listProducts } from "../../api/product"
import CardColumns from "react-bootstrap/CardColumns"
import Spinner from "react-bootstrap/Spinner"
import ProductCard from "../Home/components/ProductCard"
import ProductLoading from "../Home/components/ProductLoading"
import SideBar from "./components/SideBar"

const ShopContainer = ({ searchData }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    let isSubscribed = true
    listProducts()
      .then((response) => {
        if (isSubscribed) {
          setProducts(response.data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setLoading(false)
          console.log(err)
        }
      })

    return () => (isSubscribed = false)
  }, [])

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-2 p-3 bg-main">
          <h6 className="text-white"> Menu de recherche </h6>
          <hr />
          <SideBar />{" "}
        </div>
        <div className="col-md-10 rounded pt-3">
          {searchData && searchData.loading ? (
            <div className="text-center">
              <Spinner
                animation="border"
                variant="info"
                style={{ marginTop: "10vh" }}
              />
              <CardColumns>
                {" "}
                <ProductLoading count={3} />{" "}
              </CardColumns>
            </div>
          ) : searchData &&
            searchData.products &&
            searchData.products.length > 0 ? (
            <>
              <div className="jumbotron text-dark text-center h1 font-weight-bold">
                <h3 className="display-4 text-main">
                  Votre recherche:{" "}
                  {searchData.type === "price" ? (
                    <>
                      prix compris entre {searchData.query[0]}€ et{" "}
                      {searchData.query[1]}€{" "}
                    </>
                  ) : searchData.type === "rating" ? (
                    <> formation noté {searchData.query}/5 </>
                  ) : searchData.type === "category" ? (
                    <> categorie {searchData.products[0].category.name} </>
                  ) : (
                    <> {searchData.query} </>
                  )}
                </h3>
              </div>
              <CardColumns>
                {searchData.products.map((product) => {
                  return <ProductCard key={product._id} product={product} />
                })}
              </CardColumns>
              <hr />
            </>
          ) : searchData && searchData.error !== "" ? (
            <div className="jumbotron text-dark text-center h1 font-weight-bold">
              <h1 className="display-4 text-main">{searchData.error} </h1>
            </div>
          ) : (
            <div className="jumbotron text-dark h1 font-weight-bold">
              <h1 className="display-4">Faites votre propre recherche ! </h1>
              <p className="text-justify lead">
                {" "}
                Bienvenue dans la page d'achat et de recherche. Pour rechercher
                un produit, séléctionnez un filtre dans la barre latérale
                gauche, ou saisissez un mot clef dans la barre de recherche.
              </p>
            </div>
          )}
          <>
            <h4 className="text-center text-info font-weight-bold">
              {" "}
              Notre séléction de produit{" "}
            </h4>
            <CardColumns>
              {loading ? (
                <ProductLoading count={3} />
              ) : products && products.length > 0 ? (
                products.map((product) => {
                  return <ProductCard key={product._id} product={product} />
                })
              ) : (
                <h1 className="text-danger"> Error fetching products</h1>
              )}
            </CardColumns>
          </>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchData: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchWithQuery: (keyword, type) =>
      dispatch(searchWithQuery(keyword, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)
