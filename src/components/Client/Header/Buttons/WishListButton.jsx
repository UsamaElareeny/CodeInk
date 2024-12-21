import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WishListButton() {
  const navigate=useNavigate();
  const wishlistSize=useSelector((state)=>state.wishlist.wishlistSize);
  return (
    <button className="relative h-12 bg-buttonBgColor place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70" onClick={()=>navigate("wishList")}>
      <i className="fa-regular fa-heart"></i>
      <span className="absolute grid place-items-center bg-black text-xs text-white font-black h-6 w-6 text-2 rounded-full border-[1px] border-solid -top-1 -right-3">
        {wishlistSize}
      </span>
    </button>
  );
}
