import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutCss.css';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';

const CheckoutForm = ({ payItem, onClose }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (payItem?.registrationFee) {
      getClientSecret({ registrationFee: payItem?.registrationFee });
    }
  }, [payItem?.registrationFee]);

  const getClientSecret = async (registrationFee) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, registrationFee);
    console.log('check', data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: 'Jenny Rosen',
            },
          },
        },
      );

      if (confirmError) {
        console.log('[confirmError]', confirmError);
      } else {
        console.log('[PaymentIntent]', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
          try {
            await axios.post("https://learn-together-server-lemon.vercel.app/book-session", {
              studentEmail: user.email,
              sessionId: payItem._id,
              tutorEmail: payItem.tutorEmail,
              sessionInfo: payItem,
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your registration successful",
              showConfirmButton: false,
              timer: 1500
            });
          } catch (error) {
            console.error("Error booking session:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `session ${error.message}`,
              showConfirmButton: false,
              timer: 2500
            });
          }
          onClose();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className='bg-blue-100 hover:text-white py-1  hover:bg-blue-400 px-2 rounded-md transition-colors duration-400'
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${payItem?.registrationFee}
      </button>
    </form>
  );
};

export default CheckoutForm;
