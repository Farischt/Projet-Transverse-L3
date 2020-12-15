import React from "react"
import CategoryList from "./CategoryList"
import CategoryCreate from "./CategoryCreate"

const CategoryContainer = () => {
  return (
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <CategoryCreate />
      <hr />
      <CategoryList />
    </div>
  )
}

export default CategoryContainer
