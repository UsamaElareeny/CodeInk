import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const navigate = useNavigate()
  const totalCost=useSelector((state)=>state.cart.totalCost)||0
  const shippingCost=useSelector((state)=>state.cart.shippingCost)
  return (
    <button className="relative bg-black h-12 place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70" onClick={()=>navigate("shoppingCart")}>
      <i className="text-white fa-solid fa-cart-shopping"></i>
      <span className="absolute grid place-items-center bg-white text-xs text-[#ed9c4b] font-black h-6 w-12 text-2 rounded-full border-[1px] border-solid -top-2 -right-8">
        {totalCost} EGP
      </span>
    </button>
  );
}
