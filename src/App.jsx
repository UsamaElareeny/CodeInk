import Header from "./components/Header/Header.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Books from "./components/Books/Books.jsx";
import Footer from "./components/Footer/Footer.jsx";
import BookView from "./components/BookView/BookView.jsx";
export default function App() {
  return (
    <>
      <Header />
      <BookView />
      {/* <section className="flex flex-col md:flex-row my-8">
        <Categories />
        <Books />
      </section> */}
      <Footer />
    </>
  );
}
