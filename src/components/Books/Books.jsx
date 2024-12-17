import Book from "./Book.jsx";

export default function Books({ books, handleSortChange }) {
  // Destructure items from the books object
  const { items } = books;

  return (
    <div className="md:w-4/5 w-full">
      <div className="px-4 mb-4 flex flex-row justify-between items-center">
        <div className="results-text text-gray-700 text-xs md:text-base">
          Showing {books.items.length || 0} results of {books.count}
        </div>
        <div className="w-full md:w-auto lg:w-1/4">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
            onChange={handleSortChange}
          >
            <option value="title">Title</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 transition-all duration-300 ease-linear">
        {items && items.length > 0 ? (
          items.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}
