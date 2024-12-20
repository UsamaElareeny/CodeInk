import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAddressDetails, updateAddressDetails } from "../../../redux/paymentSlice";

const StepAddress = ({ nextStep }) => {
    const dispatch = useDispatch();
    const { addressDetails } = useSelector((state) => state.payment);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateAddressDetails({ [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Shipping Address</h3>
            <div className={" flex justify-between flex-wrap py-3"}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={addressDetails.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={addressDetails.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
                <input
                    type="text"
                    placeholder="Street"
                    value={addressDetails.street}
                    name="street"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={addressDetails.city}
                    name="city"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
                <input
                    type="text"
                    placeholder="State"
                    value={addressDetails.state}
                    name="state"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={addressDetails.postalCode}
                    name="postalCode"
                    onChange={handleInputChange}
                    className={styles.input + " flex-1"}
                    required
                />
            </div>

            <button type="submit" className={styles.nextButton}>
                Next &gt;
            </button>
            <button
                onClick={() => dispatch(clearAddressDetails())}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Clear Payment Details
            </button>
        </form>
    );
};

export default StepAddress;
