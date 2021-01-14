import { searchQuery } from "../../api/product"
import { searchRequest, searchFailure, searchSuccess } from "./searchActions"
import ReactGa from "react-ga"

//? Search with a keyword
export const searchWithQuery = (filter, type) => {
  return async (dispatch) => {
    dispatch(searchRequest(filter, type))
    try {
      const response = await searchQuery(filter, type)
      dispatch(searchSuccess(response.data, filter, type))
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 404)
        dispatch(searchFailure(err.response.data.errorMessage, filter, type))
      else {
        dispatch(searchFailure("Une erreur est survenu", filter, type))
      }
    }
  }
}
