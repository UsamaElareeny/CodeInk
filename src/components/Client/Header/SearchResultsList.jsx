import { Link } from "react-router-dom";
import "./SearchResultsList.css";

export const SearchResultsList = ({ results,onClearSearch }) => {
  // Return nothing if there are no results
  if (!results || results.length === 0) {
    return null;
  }

  const handleLinkClick = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };


  return (
    <div className="results-list">
      {results.map((book) => (
        <Link to={`book/${book.id}`} key={book.id} className="result-item" onClick={handleLinkClick}>
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="book-image"
          />
          <div className="book-details">
            <h4 className="book-title">{book.title}</h4>
            <p className="book-author">by {book.author}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
