import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryOptions, setDeliveryID, setDeliveryOption } from "../../../redux/deliverySlice";
import { addShippingCost } from "../../../redux/cartSlice";

const StepDelivery = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const { deliveryOption, deliveryOptions, status, id } = useSelector((state) => state.delivery);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDeliveryOptions());
    }
  }, [status, dispatch]);
  const handleChange = (e) => {
    dispatch(setDeliveryOption(e.target.value));
    dispatch(setDeliveryID())
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Delivery Options</h3>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <select
          value={deliveryOption}
          onChange={handleChange}
          className={styles.select}
        >
          {deliveryOptions.map(option => (
            <option key={option.shortName} value={option.shortName} >
              {`${option.description} - ${option.deliveryTime} - $${option.price}`}
            </option>
          ))}
        </select>
      )}


      <div className={styles.buttonGroup}>
        <button type="button" onClick={prevStep} className={styles.backButton}>
          &lt; Back
        </button>
        <button type="submit" className={styles.nextButton} onClick={() => {
          dispatch(addShippingCost(deliveryOptions[id-1].price))
        }}>
          Next &gt;
        </button>
      </div>
    </form>
  );
};

export default StepDelivery;
