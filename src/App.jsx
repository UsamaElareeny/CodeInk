import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "../src/components/LoginRegister/LoginRegister.jsx";
import Home from "./components/Home/home.jsx";
import BookView from "./components/Books/BookView.jsx";
export default function App() {
  return (
      <>
        {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="book/:bookId" element={<BookView />} />
            <Route path="login" element={<LoginRegister />} />
          </Routes>
      </>
      
  );
}
