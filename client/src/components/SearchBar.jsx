import React from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { searchWithQuery } from "../redux"

const SearchBar = ({ searchData, searchWithQuery, isButton }) => {
  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    searchWithQuery(searchData.query, "keyword")
    if (history.location.pathname !== "/shop") {
      history.push(`/shop?${searchData.query}&&type=${searchData.type}`)
    }
  }

  const handleInputChange = (e) => {
    setTimeout(() => {
      searchWithQuery(e.target.value, "keyword")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className=" form-inline mt-2 mt-md-0 mr-2">
      {searchData && (
        <input
          onChange={handleInputChange}
          className="form-control my-2 mr-sm-2"
          type="text"
          name="text"
          placeholder="Recherche..."
          defaultValue={searchData.type === "keyword" ? searchData.query : ""}
          style={{ maxWidth: "10rem" }}
        />
      )}
      {isButton && (
        <button
          type="submit"
          className="btn btn-outline-info my-2 my-sm-0 ml-1"
        >
          {" "}
          <SearchOutlined />{" "}
        </button>
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
    searchWithQuery: (keyword, type) =>
      dispatch(searchWithQuery(keyword, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
