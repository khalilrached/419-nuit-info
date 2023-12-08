import * as React from "react"
import Nav from "./navbar"
import { CssWrapper } from "../utils/wrappers"

const Header = ({ siteTitle,active,style }) => (
  <header>
    <Nav active={active} ></Nav>
    <CssWrapper style={style} />
  </header>
)

export default Header
