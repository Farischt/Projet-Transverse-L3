import { searchQuery } from "../../api/product"

import { searchRequest, searchFailure, searchSuccess } from "./searchActions"

//? Search with a keyword
export const searchWithQuery = (keyword) => {
  return async (dispatch) => {
    dispatch(searchRequest())
    try {
      const response = await searchQuery(keyword)
      dispatch(searchSuccess(response.data))
    } catch (err) {
      dispatch(searchFailure("Une erreur est survenu"))
    }
  }
}
