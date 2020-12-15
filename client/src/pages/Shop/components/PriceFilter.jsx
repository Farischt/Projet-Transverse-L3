import React, { useState } from "react"
import { connect } from "react-redux"
import { searchWithQuery } from "../../../redux"
import { Slider } from "antd"

const PriceFilter = ({ searchData, searchWithQuery }) => {
  const [query, setQuery] = useState([100, 900])

  const handleSliderAfterChange = (value) => {
    searchWithQuery(value, "price")
  }

  return (
    <div>
      {" "}
      <Slider
        className="ml-4 mr-4"
        tipFormatter={(value) => `${value}€`}
        max={1000}
        range
        value={query}
        onChange={(value) => setQuery(value)}
        onAfterChange={(value) => handleSliderAfterChange(value)}
      />
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
    searchWithQuery: (filter, type) => dispatch(searchWithQuery(filter, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter)
