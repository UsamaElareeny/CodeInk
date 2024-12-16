import Header from "./components/Header/Header.jsx";
import WishList from "./components/WishList/WishList.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Books from "./components/Books/Books.jsx";
import Footer from "./components/Footer/Footer.jsx";
export default function App() {
  return (
    <>
      <Header />
      <section className="flex flex-col md:flex-row my-8">
        <Categories />
        <Books />
      </section>
      <Footer />
    </>
  );
}
