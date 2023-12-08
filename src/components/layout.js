/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "./header"
import "./layout.css"
import { Container } from "@chakra-ui/react"

const Layout = ({ children, active, style, script }) => {

  return (
    <>
      <Header style={style} active={active} siteTitle={`Title`} />
      <main>
        <Container className="min-h-screen absolute top-0 flex items-end pb-12" children={children} px={{ base: '2', md: '32' }} maxW={'full'} />
      </main>
    </>
  )
}

export default Layout
