import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { searchWithQuery } from "../../../redux"
import { getCategories } from "../../../api/category"
import Spinner from "react-bootstrap/Spinner"

const CategoryFilter = ({ searchData, searchWithQuery }) => {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // const fetchCategories = async () => {
  //   setCategoriesLoading(true)
  //   try {
  //     const response = await getCategories()
  //     setCategories(response.data)
  //     setCategoriesLoading(false)
  //   } catch (err) {
  //     setCategoriesLoading(false)
  //     if (err.response.status === 400) {
  //       setCategories([])
  //     } else setCategoriesLoading(false)
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   fetchCategories()
  // }, [])

  useEffect(() => {
    let isSubscribed = true
    getCategories()
      .then((response) => {
        if (isSubscribed) {
          setCategories(response.data)
          setCategoriesLoading(false)
        }
      })
      .catch((error) => {
        if (isSubscribed) {
          setCategoriesLoading(false)
          console.log(error)
        }
      })

    return () => (isSubscribed = false)
  }, [])

  const handleSelectChange = (e) => {
    searchWithQuery(e.target.value, "category")
  }

  return (
    <div className="ml-4 mr-4 p-2">
      {categoriesLoading ? (
        <Spinner animation="border" variant="info" />
      ) : (
        categories &&
        categories.length > 0 && (
          <select
            className="custom-select custom-select-md"
            onChange={handleSelectChange}
            defaultValue={{ value: "default" }}
          >
            <option value="default"> Choisir une catégorie </option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {" "}
                  {category.name}{" "}
                </option>
              )
            })}
          </select>
        )
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
