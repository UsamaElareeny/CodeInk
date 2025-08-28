import React from 'react'
import Footer from '../../components/Client/Footer/Footer'
import Header from '../../components/Client/Header/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex-1 flex-col  '>
      <div className="container flex-grow mb-4 min-h-screen">
      <Header />
          <Outlet />
      </div>
      <Footer />
    </div>
  )
}