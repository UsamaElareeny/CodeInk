import "./book.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../redux/wishListSlice";

export default function Book({ book }) {
  const [wishList, setWishList] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div className="book">
      {/* Book image and link to book details page */}
      <div className="image">
        <Link to={`/client/book/${book.id}`}>
          <img src={book.coverImageUrl} alt={`${book.title} book image`} />
        </Link>
      </div>

      {/* Wishlist button */}
      <div className={wishList ? "wishlist-button clicked" : "wishlist-button"}>
        <button
          onClick={() => {
            setWishList(!wishList);
            if (!wishList) dispatch(addToWishlist(book));
            else dispatch(removeFromWishlist(book.id));
          }}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>

      {/* Book info section */}
      <div className="book-info">
        <div className="title">{book.title}</div>
        <div className="flex justify-between flex-col">
          <div className="price">${book.price} EGP</div>
          
          <div className="cart-button">
            <button
              onClick={() => {
                dispatch(addItem(book));
              }}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>

      
    </div>
  );
}