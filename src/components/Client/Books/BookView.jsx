import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function BookView() {
  const [content, setContent] = useState(""); // Content for tabs
  const [quantity, setQuantity] = useState(1); // Quantity for cart
  const [book, setBook] = useState(null); // Current book data
  const [relatedBooks, setRelatedBooks] = useState([]); // Related books
  const params = useParams();

  // API URLs (adjust to your actual API)
  const bookApiUrl = `http://codeink.runasp.net/api/books/Published/${params.bookId}`;
  const relatedBooksApiUrl = `http://codeink.runasp.net/api/books/${params.bookId}/related`;

  useEffect(() => {
    // Fetch the book details
    axios
      .get(bookApiUrl)
      .then((response) => {
        setBook(response.data?.data || null);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setBook(null);
      });

    // Fetch related books
    axios
      .get(relatedBooksApiUrl)
      .then((response) => {
        const books = response.data?.data || [];
        setRelatedBooks(books.slice(0, 4)); // Limit to first 4 books
      })
      .catch((error) => {
        console.error("Error fetching related books:", error);
        setRelatedBooks([]);
      });
  }, [params.bookId]);

  // Increment and decrement handlers
  const handleIncrement = () => {
    if (quantity < 50) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!book) {
    return (
      <div className="text-center text-lg font-bold mt-8">
        Loading book details...
      </div>
    );
  }

  return (
    <section className="p-4">
      {/* Book Details */}
      <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Book Cover */}
        <div className="md:w-1/3">
          <img
            src={book.coverImageUrl || "https://via.placeholder.com/150"}
            alt={book.title || "Book Cover"}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Book Info */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{book.title || "Book Title"}</h1>
          <p className="text-xl font-semibold text-mainColor mb-4">
            {book.price || 0} EGP
          </p>
          <div className="flex items-center gap-4 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={handleDecrement}
                className="p-2 bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-none"
              />
              <button
                onClick={handleIncrement}
                className="p-2 bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className="px-6 py-2 text-white bg-mainColor rounded-lg hover:bg-opacity-80">
              Add to Cart
            </button>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-4 border-b mb-4">
              <button
                onClick={() =>
                  setContent(
                    book.categories?.map((cat) => cat.name).join(", ") ||
                      "No categories available"
                  )
                }
                className="pb-2 border-b-2 border-transparent hover:border-mainColor"
              >
                Category
              </button>
              <button
                onClick={() => setContent(book.description || "No description")}
                className="pb-2 border-b-2 border-transparent hover:border-mainColor"
              >
                Description
              </button>
              <button
                onClick={() =>
                  setContent(
                    "Books are delivered with a shipping company. Delivery duration is 2-4 working days."
                  )
                }
                className="pb-2 border-b-2 border-transparent hover:border-mainColor"
              >
                Shipping & Delivery
              </button>
            </div>
            <p className="text-gray-700">{content || "Select a tab"}</p>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        {relatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {relatedBooks.map((relatedBook) => (
              <Link
                key={relatedBook.id}
                to={`/client/book/${relatedBook.id}`} // Navigate to BookView page for each related book
                className="border rounded-lg p-4"
              >
                <img
                  src={relatedBook.coverImageUrl || "https://via.placeholder.com/150"}
                  alt={relatedBook.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2 text-center">
                  {relatedBook.title}
                </h3>
                <p className="text-mainColor font-bold text-center">
                  {relatedBook.price || 0} EGP
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No related books available.</p>
        )}
      </div>
    </section>
  );
}
