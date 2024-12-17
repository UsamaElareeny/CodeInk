import React from 'react'
import Footer from '../../components/Client/Footer/Footer'
import Header from '../../components/Client/Header/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Header />
        <Outlet />
    <Footer />
    </>
  )
}
