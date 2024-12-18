import React, { useState } from "react";
import StepAddress from "../../../components/Client/Checkout/StepAddress";
import StepDelivery from "../../../components/Client/Checkout/StepDelivery";
import StepReview from "../../../components/Client/Checkout/StepReview";
import StepPayment from "../../../components/Client/Checkout/StepPayment";
import styles from "../../../components/Client/Checkout/Checkout.module.css";

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${step === 1 && styles.activeTab}`}>ADDRESS</div>
        <div className={`${styles.tab} ${step === 2 && styles.activeTab}`}>DELIVERY</div>
        <div className={`${styles.tab} ${step === 3 && styles.activeTab}`}>REVIEW</div>
        <div className={`${styles.tab} ${step === 4 && styles.activeTab}`}>PAYMENT</div>
      </div>

      <div className={styles.content}>
        {step === 1 && <StepAddress nextStep={nextStep} />}
        {step === 2 && <StepDelivery nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <StepReview nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <StepPayment prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default Checkout;
