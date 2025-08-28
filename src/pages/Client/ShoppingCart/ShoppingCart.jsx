import React from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div className="flex justify-between px-10 py-8 bg-gray-50 min-h-screen">
      {/* Cart Items Section */}
      <div className="w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Order Summary Section */}
      <OrderSummary />
    </div>
  );
};

export default ShoppingCart;