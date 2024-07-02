import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckouteForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentModal = ({payItem, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-2">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/3 w-full ">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm payItem={payItem} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
