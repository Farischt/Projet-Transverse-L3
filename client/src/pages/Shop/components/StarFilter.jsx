import React, { useState } from "react"
import StarRatings from "react-star-ratings"
import { connect } from "react-redux"
import { searchWithQuery } from "../../../redux"

const StarFilter = ({ searchData, searchWithQuery }) => {
  const [rating, setRating] = useState(0)

  const handleStarClick = (newRating) => {
    setRating(newRating)
    searchWithQuery(newRating, "rating")
  }

  return (
    <>
      <StarRatings
        changeRating={handleStarClick}
        numberOfStars={5}
        starDimension="20px"
        starSpacing="3px"
        starHoverColor="gold"
        starEmptyColor="lightgrey"
        starRatedColor="gold"
        isSelectable={true}
        rating={rating}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(StarFilter)
