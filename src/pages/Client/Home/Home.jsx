import { useEffect, useState } from "react";
import Header from "../../../components/Client/Header/Header.jsx";
import Categories from "../../../components/Client/Categories/Categories.jsx";
import Books from "../../../components/Client/Books/Books.jsx";
import Footer from "../../../components/Client/Footer/Footer.jsx";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState({ items: [] });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books with sorting option
  const fetchBooks = (sortBy,page,size) => {
    let endpoint = `http://codeink.runasp.net/api/books/Published?pageNumber=${page}&pageSize=${size}`;

    // Append query parameters for sorting
    switch (sortBy) {
      case "lowToHigh":
        endpoint += "&orderBy=PriceAsc";
        break;
      case "highToLow":
        endpoint += "&orderBy=PriceDesc";
        break;
      default:
        endpoint += "&orderBy=title";
        break;
    }

    if(selectedCategory!=null){
      endpoint += `&categoryId=${selectedCategory}`;
    }

    axios
      .get(endpoint)
      .then((response) => {
        // Ensure response has data
        console.log(response.data.data);
        setBooks(response.data.data || {}); // Set empty array if no data
        setTotalPages(response.data.data.totalPages);
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
    fetchBooks(sortOption,currentPage,pageSize); // Fetch books when sortOption changes
    handleFetchCategories(); // Fetch categories
  }, [sortOption,selectedCategory,currentPage,pageSize]);

  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };

  // Handle search value change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(Number(size)); 
  
    setCurrentPage(1); 
  
    fetchBooks(sortOption,currentPage,pageSize); 
  };
  

  return (
    <>
      <section className="flex flex-col md:flex-row my-8">
        <Categories categories={categories} setSelectedCategory={setSelectedCategory} />
        <Books books={books} handleSortChange={handleSortChange} />
      </section>


      <div className="flex justify-center items-center my-4 space-x-4">
        {/* Page Size Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            className="border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span className="text-sm text-gray-700">per page</span>
        </div>

        {/* Previous Button */}
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </>
  );
}