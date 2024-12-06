import { useState } from "react";
import "./book.css";

export default function Book({ title, price, ImgSource }) {
  const [wishList, setWishList] = useState(false);
  return (
    <div className="book">
      <div className="image">
        <a href="#book">
          <img src={ImgSource} alt={`${title} book image`} />
        </a>
      </div>
      <div className={wishList ? "wishlist-button clicked" : "wishlist-button"}>
        <button onClick={() => setWishList(!wishList)}>
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <div className="book-info">
        <div className="title">{title}</div>
        <div className="price">${price} EGP</div>
      </div>
      <div className="cart-button">
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
