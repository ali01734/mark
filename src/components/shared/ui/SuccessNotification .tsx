"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('p') || '';

  useEffect(() => {
    if (orderId) {
      setShowNotification(true);
      const preserveKeys = ['access_token', 'currencySession', 'username', 'UserId'];
      Object.keys(localStorage).forEach((key) => {
        if (!preserveKeys.includes(key)) {
            localStorage.removeItem(key);
        }
      });
    }
  }, [orderId]); 


  if (!showNotification) {
    return null;
  }

  return (
    <div className="bg-teal-500 text-white p-4 text-center mt-5">
      <p>
        Payment Success. Your Order Id # <strong>{orderId}</strong> (Confirmation email sent to your given email address. If you have not received any confirmation email within 10 minutes, please check the spam folder.)
      </p>
    </div>
  );
};

export default PaymentNotification;
