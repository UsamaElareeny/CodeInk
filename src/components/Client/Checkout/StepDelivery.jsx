import React, { useState } from "react";
import styles from "./Checkout.module.css";

const StepDelivery = ({ nextStep, prevStep }) => {
  const [deliveryOption, setDeliveryOption] = useState("Standard");

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Delivery Options</h3>
      <select
        value={deliveryOption}
        onChange={(e) => setDeliveryOption(e.target.value)}
        className={styles.select}
      >
        <option value="Standard">Standard - Free</option>
        <option value="Express">Express - $10</option>
      </select>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={prevStep} className={styles.backButton}>
          &lt; Back
        </button>
        <button type="submit" className={styles.nextButton}>
          Next &gt;
        </button>
      </div>
    </form>
  );
};

export default StepDelivery;
