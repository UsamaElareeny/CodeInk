import { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book.jsx";

export default function Books() {
  const [books, setBooks] = useState({ items: [] }); // Initialize items as an empty array
  const [sortOption, setSortOption] = useState("popularity"); // Sorting state

  // Fetch books from API with sorting
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

    // API call
    axios
      .get(endpoint)
      .then((response) => {
        setBooks(response.data.data || { items: [] }); // Handle null or empty responses
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks({ items: [] }); // Reset to avoid breaking the app
      });
  };

  // Fetch books when the component mounts or sort option changes
  useEffect(() => {
    fetchBooks(sortOption);
  }, [sortOption]);

  // Handle sorting changes
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="md:w-4/5 w-full">
      {/* Filters */}
      <div className="px-4 mb-4 flex flex-row justify-between items-center">
        <div className="results-text text-gray-700 text-xs md:text-base">
          Showing {books.items.length || 0} results of {books.count}
        </div>
        <div className="w-full md:w-auto lg:w-1/4">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">Sort by title</option>
            <option value="lowToHigh">Sort by price: low to high</option>
            <option value="highToLow">Sort by price: high to low</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 transition-all duration-300 ease-linear">
        {books.items?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
