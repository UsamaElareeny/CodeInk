import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/home.jsx";
import BookView from "./components/Books/BookView.jsx";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="book/:bookId" element={<BookView />} />
      </Routes>
    </>
  );
}
