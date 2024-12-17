import { useState } from "react";
import WishListButton from "./Buttons/WishListButton.jsx";
import LoginRegisterButton from "./Buttons/LoginRegisterButton.jsx";
import CartButton from "./Buttons/CartButton.jsx";
export default function Buttons() {
  const [phoneScreen, setPhoneScreen] = useState(false);

  return (
    <div className="flex justify-end space-x-3" id="icons">
      {phoneScreen ? (
        <div className="flex justify-around items-center w-full">
          <form className="relative mx-2 rounded-full w-full md:w-3/6 border-[1px] border-buttonBgColorHover">
            <input
              type="text"
              placeholder="Search for Books..."
              className="rounded-full outline-none pl-10 w-full h-[42px] md:text-md"
              required
              autoComplete="off"
            />
            <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <button
            className="h-12 bg-buttonBgColor place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70"
            onClick={() => setPhoneScreen(false)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      ) : (
        <div className="flex space-x-3">
          <button
            className="block sm:hidden h-12 bg-buttonBgColor place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70"
            onClick={() => setPhoneScreen(!phoneScreen)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <WishListButton />
          <LoginRegisterButton />
          <CartButton />
        </div>
      )}
    </div>
  );
}
