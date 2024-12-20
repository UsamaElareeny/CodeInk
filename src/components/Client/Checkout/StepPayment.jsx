import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentDetails, clearPaymentDetails } from "../../../redux/paymentSlice";
import { clearOrderState, createOrder } from "../../../redux/orderSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./Checkout.module.css";

const stripePromise = loadStripe("pk_test_51QUmjqGbIAD7CZkGi7U0vlILKzyMxwHDZQYbxq8DmJUH5TL2Ynr3Cg7OV1DsZHvop2vL6U9ju08LuLi3hNhI8IRu00euHybxMC");

const PaymentForm = ({ prevStep }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [errorStripe, setErrorStripe] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { addressDetails } = useSelector((state) => state.payment);
  const { paymentIntentId, clientSecret, deliveryMethodId, cartItems } = JSON.parse(
    localStorage.getItem("payment")
  ) || { paymentIntentId: "", clientSecret: "", deliveryMethodId: "", cartItems: [] };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorStripe("Stripe.js has not loaded yet. Please wait.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorStripe("Please provide card details.");
      setIsProcessing(false);
      return;
    }

    // Confirm Card Payment
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${addressDetails.firstName} ${addressDetails.lastName}`, // Example fields
            address: {
              line1: addressDetails.addressLine1,
              city: addressDetails.city,
              postal_code: addressDetails.postalCode,
            },
          },
        },
      });

      if (result.error) {
        setErrorStripe(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Dispatch Order
        dispatch(createOrder({ paymentIntentId,clientSecret, shippingAddress: addressDetails, deliveryMethodId, orderItems: cartItems }));
        alert("Payment successful!");
      }
    } catch (error) {
      setErrorStripe(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className={styles.form}>
      <h3>Payment Information</h3>
      <CardElement className={styles.cardElement} />
      <div className={styles.buttonGroup}>
        <button type="button" onClick={prevStep} className={styles.backButton}>
          &lt; Back
        </button>
        <button type="submit" className={styles.submitButton} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Submit Order &gt;"}
        </button>
      </div>
      {errorStripe && <p className="text-red-500 mt-4">Error: {errorStripe}</p>}
    </form>
  );
};

const StepPayment = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StepPayment;
