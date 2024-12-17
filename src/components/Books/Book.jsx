import "./book.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Book({ book }) {
  const [wishList, setWishList] = useState(false);

  return (
    <div className="book">
      <div className="image">
        <Link to={`/book/${book.id}`}>
          <img src={book.coverImageUrl} alt={`${book.title} book image`} />
        </Link>
      </div>
      <div className={wishList ? "wishlist-button clicked" : "wishlist-button"}>
        <button onClick={() => setWishList(!wishList)}>
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <div className="book-info">
        <div className="title">{book.title}</div>
        <div className="price">${book.price} EGP</div>
      </div>
      <div className="cart-button">
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
