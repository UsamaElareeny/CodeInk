import Book from "./Book";
import "../Books/book.css";

export default function Books({ books, handleSortChange }) {
  // Destructure items from the books object
  const { items } = books;

  return (
    <div className="books">
      <div className="sort-options">
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      <div className="book-list">
        {items && items.length > 0 ? (
          items.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}
