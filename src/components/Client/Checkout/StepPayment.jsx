import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentDetails, processPayment, clearPaymentDetails } from '../../../redux/paymentSlice';
import styles from "./Checkout.module.css"
const StepPayment = ({prevStep}) => {
  const dispatch = useDispatch();
  const { paymentDetails, loading, error, success } = useSelector((state) => state.payment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePaymentDetails({ [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    dispatch(processPayment(paymentDetails));
  };
  return (
    <form onSubmit={handlePayment} className={styles.form}>
      <h3>Payment Information</h3>

      <input
        type="text"
        name="nameOnCard"
        placeholder="Name on card"
        onChange={handleInputChange}
        value={paymentDetails.nameOnCard}
        className={styles.input}
        required
      />

      <div className={styles.cardDetails}>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 1234 1234 1234"
          onChange={handleInputChange}
          value={paymentDetails.cardNumber}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="MM / YY"
          onChange={handleInputChange}
          value={paymentDetails.expiryDate}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={handleInputChange}
          value={paymentDetails.cvc}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={prevStep} className={styles.backButton}>
          &lt; Back
        </button>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          Submit Order &gt;
        </button>
      </div>

      {loading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {success && <p className="text-green-500 mt-4">Payment processed successfully!</p>}
      <button
        onClick={() => dispatch(clearPaymentDetails())}
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Clear Payment Details
      </button>
    </form>
  );
};

export default StepPayment;
