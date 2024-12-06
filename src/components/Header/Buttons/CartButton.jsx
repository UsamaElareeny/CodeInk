export default function CartButton() {
  return (
    <button className="relative bg-black h-12 place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70">
      <i className="text-white fa-solid fa-cart-shopping"></i>
      <span className="absolute grid place-items-center bg-white text-xs text-[#ed9c4b] font-black h-6 w-12 text-2 rounded-full border-[1px] border-solid -top-2 -right-8">
        0 EGP
      </span>
    </button>
  );
}
