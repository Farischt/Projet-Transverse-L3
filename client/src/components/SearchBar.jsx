import React, { useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import { connect } from "react-redux"
import { searchWithQuery } from "../redux"

const SearchBar = ({ searchData, searchWithQuery }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    searchWithQuery(query)
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="form-inline mt-2 mt-md-0">
      {searchData && searchData.loading ? (
        <Spinner animation="border" variant="info" />
      ) : searchData.error ? (
        <h1> {searchData.error} </h1>
      ) : (
        <input
          onChange={handleInputChange}
          className="form-control my-2 mr-sm-2"
          type="text"
          name="text"
          placeholder="Recherche"
        />
      )}
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    searchData: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchWithQuery: (keyword) => dispatch(searchWithQuery(keyword)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
