import React from "react"
import PriceFilter from "./PriceFilter"
import CategoryFilter from "./CategoryFilter"
import StarFilter from "./StarFilter"
import { Menu } from "antd"
const { SubMenu } = Menu

const SideBar = () => {
  return (
    <Menu
      defaultOpenKeys={["sub1", "sub2", "sub3"]}
      mode="inline"
      className="rounded"
      theme="light"
    >
      <SubMenu key="sub1" title="Filtre par note" className=" rounded">
        <div className="pr-4 pl-4 pb-2">
          <StarFilter />
        </div>
      </SubMenu>
      <SubMenu key="sub2" title="Filtre par prix">
        <PriceFilter />
      </SubMenu>
      <SubMenu key="sub3" title="Filtre par catégorie">
        <CategoryFilter />
      </SubMenu>
    </Menu>
  )
}

export default SideBar
