import { useEffect, useState } from "react";
import Books from "../Books/Books";
import Categories from "../Categories/Categories";
import axios from "axios";
import Header from "../Header/Header";

export default function Home() {
  const [books, setBooks] = useState({items: []});
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("title");

  // Fetch books with sorting option
  const fetchBooks = (sortBy) => {
    let endpoint = "http://codeink.runasp.net/api/books/Published";

    // Append query parameters for sorting
    switch (sortBy) {
      case "lowToHigh":
        endpoint += "?orderBy=PriceAsc";
        break;
      case "highToLow":
        endpoint += "?orderBy=PriceDesc";
        break;
      default:
        endpoint += "?orderBy=title";
        break;
    }

    axios
      .get(endpoint)
      .then((response) => {
        // Ensure response has data
        console.log(response.data.data);
        setBooks(response.data.data || {}); // Set empty array if no data
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks({}); // Reset to avoid breaking the app
      });
  };

  // Fetch categories
  const handleFetchCategories = () => {
    axios
      .get("http://codeink.runasp.net/api/categories")
      .then((response) => {
        setCategories(response.data?.data || []); // Ensure categories are set properly
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // Reset to avoid errors
      });
  };

  useEffect(() => {
    fetchBooks(sortOption); // Fetch books when sortOption changes
    handleFetchCategories(); // Fetch categories
  }, [sortOption]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
        <Header />
        <section className="flex flex-col md:flex-row my-8 space-x-4">
            <Categories categories={categories} />
            <Books books={books} handleSortChange={handleSortChange} />
        </section>
        <Footer />

    </>
  );
  
}
