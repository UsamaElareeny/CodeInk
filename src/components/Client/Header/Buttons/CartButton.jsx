import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const navigate = useNavigate();
  
  const items = useSelector((state) => state.cart.items);
  
  const totalItemsCount = items.length || 0;

  return (
    <button
      className="relative bg-black h-12 place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70"
      onClick={() => navigate("shoppingCart")}
    >
      <i className="text-white fa-solid fa-cart-shopping"></i>
      <span className="absolute grid place-items-center bg-white text-xs text-[#ed9c4b] font-black h-5 w-5 text-2 rounded-full border-[1px] border-solid -top-2 -right-0">
        {totalItemsCount}
      </span>
    </button>
  );
}