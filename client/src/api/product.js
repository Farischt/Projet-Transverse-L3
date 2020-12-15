import axios from "axios"

export const createProduct = async (product) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product)
}

export const listProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products`)
}

export const removeProduct = async (slug) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/product/${slug}`)
}

export const listSpecificProducts = async (sort, order, limit) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
    sort,
    order,
    limit,
  })
}

export const listPagination = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products/page`, {
    sort,
    order,
    page,
  })
}

export const productsTotal = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/total`)
}

export const readProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`)
}

export const rateProduct = async (star, productId) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/rating/${productId}`,
    { star }
  )
}

export const listRelated = async (productId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/product/related/${productId}`
  )
}

export const searchQuery = async (query, type) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/search/filters`, {
    query,
    type,
  })
}
