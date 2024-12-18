import "./book.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../../redux/cartSlice";

export default function Book({ book }) {
  const [wishList, setWishList] = useState(false);
  const dispatch=useDispatch();
  const items=useSelector((state)=>state.cart.items)
  return (
    <div className="book">
      <div className="image">
        <Link to={`book/${book.id}`}>
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
        <button onClick={()=>{
          dispatch(addItem(book))
          console.log(items)

        }}>Add to Cart</button>
      </div>
    </div>
  );
}
