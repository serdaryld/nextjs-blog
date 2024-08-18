import React, { Children } from 'react'
import { Footer, Header } from './'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout