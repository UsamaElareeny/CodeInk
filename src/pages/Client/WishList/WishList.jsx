import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../redux/wishListSlice';
import Book from '../../../components/Client/Books/Book';
import { Link } from 'react-router-dom';
// import bookImage from '../../../assets/GrokkingAlgoBook.png';

export default function WishList() {
  const items = useSelector((state) => state.wishlist.items);
  console.log(items)
  const wishlistSize = useSelector((state) => state.wishlist.wishlistSize);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="mb-4 px-2 py-8 text-white bg-[#AEB6A1] font-extrabold text-3xl">
        Wishlist
      </h1>
      { wishlistSize=== 0 ? (
        <div className="mt-20 mx-auto w-3/6 h-80 text-center">
          <h2 className="mb-4 text-4xl font-black">The wishlist is empty.</h2>
          <p className="mb-4 text-lg font-normal">
            You do not have any products in the wishlist yet. You will find a
            lot of interesting products on our Shop page.
          </p>
          <button className="text-white bg-mainColor px-6 py-2 font-bold text-center text-sm w-44 mx-auto my-2 rounded-full transition-all duration-500 ease-in-out hover:opacity-70">
            Return to Shop
          </button>
        </div>
      ) : (
        <div>
          <h2 className="font-extrabold text-lg mb-8">Your Products Wishlist</h2>
          <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            {items.map((book) => (
              <div key={book.id}>
                <button
                  className="mb-2 ml-2 text-base font-light"
                  onClick={() => dispatch(removeFromWishlist(book.id))}
                >
                  <i className="fa-solid fa-x mr-2"></i> Remove
                </button>
                  <Book book={book}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}