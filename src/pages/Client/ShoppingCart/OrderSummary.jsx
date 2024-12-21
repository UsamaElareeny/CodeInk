import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const shippingCost = useSelector((state)=>state.cart.shippingCost) || 0;
  const totalCost = useSelector((state)=>state.cart.totalCost) || 0;

  const finalTotal = totalCost + shippingCost;
  const navigate=useNavigate();
  const handelCheckout=()=>{
    navigate("/client/Checkout")
  }
  return (
    <div className="w-full max-w-sm bg-black text-white p-6 rounded-lg shadow-lg max-h-80">
      {/* Title */}
      <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
      
      {/* Price Details */}
      <div className="flex justify-between text-sm mb-2">
        <span>Original Price</span>
        <span className="font-medium">{totalCost} EGP</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>Shipping Costs</span>
        <span className="font-medium">{shippingCost} EGP</span>
      </div>

      {/* Separator */}
      <hr className="border-gray-600 my-3" />

      {/* Total */}
      <div className="flex justify-between text-lg font-extrabold">
        <span>Total</span>
        <span>{finalTotal} EGP</span>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-red-500 hover:bg-red-600 mt-4 py-2 text-white font-medium rounded transition" onClick={()=>handelCheckout()}>
        Proceed to Checkout
      </button>

      {/* Continue Shopping */}
      <p className="text-center text-xs mt-4">
        or{" "}
        <a
          href="/client"
          className="underline text-white hover:text-gray-300 transition"
        >
          Continue Shopping →
        </a>
      </p>
    </div>
  );
};

export default OrderSummary;
