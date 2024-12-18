import './App.css'
import DashBoard from './pages/Admin/DashBoard'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import A_Home from './pages/Admin/Home'
import C_Home from './pages/Client/Home/Home'
import BookView from './components/Client/Books/BookView'
import Products from './pages/Admin/Products'
import Logs from './pages/Admin/Logs'
import Report from './pages/Admin/Report'
import Settings from './pages/Admin/Settings'
import Layout from './pages/Client/Layout'
import LoginRegister from './pages/Client/LoginRegister/LoginRegister'
import WishList from './pages/Client/WishList/WishList'
import ShoppingCart from './pages/Client/ShoppingCart/ShoppingCart'
import NotFound from './pages/NotFound'
import Header from './components/Client/Header/Header'
import Footer from './components/Client/Footer/Footer'
import Checkout from './pages/Client/Checkout/Checkout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path="/admin" element={<DashBoard />}>
            <Route index element={<A_Home />} />
            <Route path="products" element={<Products />} />
            <Route path="logs" element={<Logs />} />
            <Route path="report" element={<Report />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/client" element={<Layout />}>
            <Route index element={<C_Home />} />
            <Route path="book/:bookId" element={<BookView />} />
            <Route path="wishList" element={<WishList />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path='*' element={
            <>
              <Header />
              <NotFound />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
