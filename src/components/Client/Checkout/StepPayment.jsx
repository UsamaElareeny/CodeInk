import React, { useState } from "react";
import styles from "./Checkout.module.css";

const StepPayment = ({ prevStep }) => {
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Payment Information</h3>

      <input
        type="text"
        name="nameOnCard"
        placeholder="Name on card"
        onChange={handleInputChange}
        className={styles.input}
        required
      />

      <div className={styles.cardDetails}>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 1234 1234 1234"
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="MM / YY"
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={prevStep} className={styles.backButton}>
          &lt; Back
        </button>
        <button type="submit" className={styles.submitButton}>
          Submit Order &gt;
        </button>
      </div>
    </form>
  );
};

export default StepPayment;
