import React from "react"
import PriceFilter from "./PriceFilter"
import CategoryFilter from "./CategoryFilter"
import StarFilter from "./StarFilter"
import SearchBar from "../../../components/SearchBar"
import { Menu } from "antd"
const { SubMenu } = Menu

const SideBar = () => {
  return (
    <Menu
      defaultOpenKeys={["sub1", "sub2", "sub3", "sub4"]}
      mode="inline"
      className="rounded"
      theme="dark"
    >
      <SubMenu key="sub1" title="Filtre par note" className=" rounded">
        <div className="pr-4 pl-4 py-2">
          <StarFilter />
        </div>
      </SubMenu>
      <SubMenu key="sub2" title="Filtre par prix">
        <PriceFilter />
      </SubMenu>
      <SubMenu key="sub3" title="Filtre par catégorie">
        <CategoryFilter />
      </SubMenu>
      <SubMenu key="sub4" title="Filtre par mot clef">
        <div className="px-3 py-1">
          <SearchBar isButton={false} />
        </div>
      </SubMenu>
    </Menu>
  )
}

export default SideBar
