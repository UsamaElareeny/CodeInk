import React from "react";
import styles from "./Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addShippingCost } from "../../../redux/cartSlice";


const StepReview = ({ nextStep, prevStep }) => {
    useDispatch(addShippingCost(JSON.parse(localStorage.getItem("shippingCost"))))
    const cartItems = useSelector((state) => state.cart.items)
    const shippingCost = useSelector((state) => state.cart.shippingCost) || 0;
    const totalCost = useSelector((state) => state.cart.totalCost) || 0;

    return (
        <div className={styles.form}>
            <h3>Review Your Order</h3>
            <div className=" p-3">
                <ul className="mb-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between py-2 border-b">
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>{item.price * item.quantity} EGP</span>
                        </li>
                    ))}
                    
                    <li className="flex justify-between py-2 border-b">
                        <span>Shipping Costs</span>
                        <span className="font-medium">{shippingCost} EGP</span>
                    </li>
                </ul>

                <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>{shippingCost + totalCost} EGP</span>
                </div>
            </div>


            <div className={styles.buttonGroup}>
                <button type="button" onClick={prevStep} className={styles.backButton}>
                    &lt; Back
                </button>
                <button type="button" onClick={()=>{
                    nextStep()
                    
                    }} className={styles.nextButton}>
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default StepReview;

