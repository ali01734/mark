"use client";

import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
// Load Stripe with your public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || ''); // Replace with your own key

interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

const PaymentForm: React.FC = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [orderAmount, setOrderAmount] = useState<string | null>(null);
  const [orderArr, setOrderArr] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [curSession, setCurSession] = useState<currencySessionData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
    if (currencySession) {
      setCurSession(currencySession)
    }
    const amount = localStorage.getItem('orderAmount');
    const order = localStorage.getItem('orderId');
    const orderArrData = JSON.parse(localStorage.getItem("orderArr") || "[]");
    console.log(orderArrData)
    setOrderAmount(amount);
    setOrderArr(orderArrData);
    setOrderId(order);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe has not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement not found');
      setLoading(false);
      return;
    }

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error creating Stripe token:', error);
      setLoading(false);
      return;
    }


    const formData = {
      sendingMoney: orderAmount,
      orderArr,
      stripeToken: token?.id,
      currencySym:curSession.currencySym,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/?p=${orderId}`);
        setLoading(false);
      } else {
        // router.push(`/`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred during payment:', error);
     
    }
  };

  return (
    <div className="container mx-auto p-4 my-20">
      <h1 className="text-center text-2xl font-bold mb-6">Markdrawing.com Payment</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="border rounded-lg shadow-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <Image
                width={150}
                height={30}
                src="https://markdrawing.com/markdrawing/img/stripe_credit-card-logos.png"
                alt="Credit Card Logos"
              />
            </div>
            <form onSubmit={handleSubmit} className="require-validation" id="payment-form">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name on Card</label>
                <input className="form-input w-full border border-gray-300 p-2 rounded" type="text" size={4} />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Card Details</label>
                <div className="border border-gray-300 p-2 rounded">
                  <CardElement className="w-full" />
                </div>
              </div>

              
              <input type="hidden" name="sendingMoney" value={orderAmount ?? ''} />

              <div className="hidden">
                <div className="alert-danger">Please correct the errors and try again.</div>
              </div>

              <div className="mt-6">
                <input type="hidden" id="totalPrice" value={orderAmount ?? ''} />
                <button
                    className="bg-[#3278B5] text-white text-lg font-semibold py-3 w-full rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? 'Processing...' : (
                      <>
                        Pay Now &nbsp;&nbsp;<span id="payNowBtn">{orderAmount ?? ''}</span>&nbsp;&nbsp;(GBP)
                      </>
                    )}
                  </button>
              </div>
            </form>
      
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the PaymentForm component with Elements provider at a higher level
const PaymentPage: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
