"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

interface CartItem {
  totalPrice: number;
}

interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [curSession, setCurSession] = useState<currencySessionData>({});// This should reflect your dynamic currency conversion rate
  const [openForm, setOpenForm] = useState(false); // state for opening/closing the form
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
      if (currencySession) {
        setCurSession(currencySession)
      }

      const savedCart = localStorage.getItem("totalPrice");
      if (savedCart) {
        const cartTotal = parseFloat(savedCart);
        setCartItems(cartTotal);
        setGrandTotal(cartTotal); // Initial grand total without shipping
      }
    }
  }, []);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedShipping = parseFloat(e.target.value);

    if (selectedShipping === 2) {
      const shippingPrice = 12.99 * (curSession.currencyValue || 1);
      setShippingPrice(shippingPrice);
      const grandTotal = cartItems + shippingPrice;
      setGrandTotal(grandTotal);
    } else {
      setShippingPrice(0);
      setGrandTotal(cartItems);
    }
  };

  // Handling the payment form toggle
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPayment = e.target.value;
     setPaymentMethod(selectedPayment);

    if (selectedPayment === "stripe") {
      setOpenForm(true); // Open the form when Stripe is selected
    } else {
      setButton(true)
      setOpenForm(false); // Close the form for other options like PayPal
    }
  };

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    addressTwo: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    const cartItem = localStorage.getItem("cartItems");
    const parsedCartItem = cartItem ? JSON.parse(cartItem) : {};
    const couponItem = localStorage.getItem("couponData");
    const storedCouponData = couponItem ? JSON.parse(couponItem): {};

    const orderData = {
      ...shippingDetails,
      price_with_shipping: grandTotal,
      shipping_charge: shippingPrice,
      cartDetails: parsedCartItem,
      type: paymentMethod,
      currencySym: curSession.currencySym ?? "GBP",
      cuponDetails: storedCouponData,
      userId: localStorage.getItem('UserId'),

    };

    console.log(orderData)

    if (paymentMethod === "paypal") {

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          const result = await response.json();

          console.log(result)

          if (response.ok && result.status === "success") {
            // Handle redirect to PayPal
            if (result.data.redirectUrl) {
              window.location.href = result.data.redirectUrl; // Open PayPal in a new tab
            }
          } else {
            // Handle error response from backend
            alert(`Payment failed: ${result.message}`);
          }
        } catch (error) {
          console.error("Payment failed:", error);
          alert("Payment failed. Please try again.");
        } finally {
          setLoading(false); // Stop loading
        }

    } else {
      // Handle Stripe submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      console.log(result)

      if (response.ok && result.status === "success") {
        localStorage.setItem('orderAmount', result.data.orderAmount);
        localStorage.setItem("orderArr", JSON.stringify(result.data.order));
        localStorage.setItem('orderId', String(result.data.orderId));

        router.push("/pay");
      }
    }

  };

  return (
    <div className="container mx-auto px-4 pb-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* Payment Methods Section */}
        <div className="border-r pr-6 lg:pt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Markdrawing</h1>

          <div className="pb-10">
            <div
              className="mt-4 p-2 ml-3 bg-[#3EB571] text-white"
              id="shippingRadio"
            >
              <div className="form-check py-4 flex items-center gap-5">
                <input
                  className="form-check-input text-[#3EB571]"
                  type="radio"
                  name="shipping_radio"
                  id="shipping_radio1"
                  value="1"
                  defaultChecked
                  onChange={handleShippingChange}
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="shipping_radio1"
                  style={{ fontSize: "15px" }}
                >
                  Standard Shipping{" "}
                  <span className="text-white" style={{ fontSize: "12px" }}>
                    (6 Business Days after preview confirmation)
                  </span>
                  &nbsp; &nbsp; &nbsp; Free
                </label>
              </div>
              <hr className="bg-white" />
              <div className="form-check py-4 flex items-center gap-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shipping_radio"
                  id="shipping_radio2"
                  value="2"
                  onChange={handleShippingChange}
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="shipping_radio2"
                  style={{ fontSize: "15px" }}
                >
                  Express Shipping{" "}
                  <span className="text-white" style={{ fontSize: "12px" }}>
                    (3 Business Days after preview confirmation)
                  </span>{" "}
                  12.99&nbsp;&nbsp;({curSession.currencySym ?? "GBP"})
                </label>
              </div>
            </div>
          </div>

          {/* Payment and Form Sections */}
          <div className="bg-[#3EB571] p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold text-white text-center">
              Pay With
            </h4>
          </div>

          {/* Payment Options */}
          <div className="flex flex-wrap gap-6">
            <div onClick={() => setOpenForm(!openForm)} className="flex items-center space-x-2">
              <input
                type="radio"
                id="stripeRadio"
                name="paymentRadioOptions"
                value="stripe"
                className="form-radio h-6 w-6 text-[#3EB571]"
                onChange={handlePaymentChange}
              />
              <label htmlFor="stripeRadio" className="text-gray-600">
                <Image
                  width={100}
                  height={100}
                  src="https://markdrawing.com/markdrawing/img/stripe_credit-card-logos.png"
                  alt="Stripe Credit Card"
                  className="w-40"
                />
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="paypalRadio"
                name="paymentRadioOptions"
                value="paypal"
                className="form-radio h-6 w-6 text-[#3EB571]"
                onChange={handlePaymentChange}
              />
              <label htmlFor="paypalRadio" className="text-gray-600">
                <Image
                  width={100}
                  height={100}
                  src="https://markdrawing.com/markdrawing/img/PayPal.png"
                  alt="PayPal"
                  className="w-32"
                />
              </label>
            </div>
          </div>

           {/* PayPal Form */}
           {!openForm && button && (
            <div className="mt-6">
              <button
                className="bg-[#3EB571] text-white py-3 px-6 rounded-lg hover:bg-[#3EB571] transition duration-300"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Order Confirm"
                )}
              </button>
            </div>
          )}

          {/* Stripe Form */}
          {openForm && (
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Shipping Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={shippingDetails.firstName}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={shippingDetails.lastName}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Last Name"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Street Address"
                    required
                  />
                  <input
                    type="text"
                    name="addressTwo"
                    value={shippingDetails.addressTwo}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                     className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                     className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Country"
                    required
                  />
                  <input
                    type="text"
                    name="postal_code"
                    value={shippingDetails.postal_code}
                    onChange={handleInputChange}
                     className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Zip Code"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#3EB571] text-white py-3 px-6 rounded-lg hover:bg-[#3EB571] transition duration-300 w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Order Confirm"
                )}
              </button>

            </form>
          )}

            
          {/* Policy and Terms */}
          <ul className="list-disc pl-5 mt-6 space-y-2">
            <li className="text-sm text-[#3EB571]">
              <a href="#">Refund Policy</a>
            </li>
            <li className="text-sm text-[#3EB571]">
              <a href="#">Shipping Policy</a>
            </li>
            <li className="text-sm text-[#3EB571]">
              <a href="#">
                By checking this box, I consent to receive automated marketing
                from [YOUR STORE NAME] by email and text message at the email
                address and mobile number provided. Consent is not a condition
                to purchase.
              </a>
            </li>
            <li className="text-sm text-[#3EB571]">
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <p>Subtotal</p>
              <p>{cartItems.toFixed(2)}  {curSession.currencySym ?? "GBP"}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <p id="sheppingText">Shipping</p>
              <p id="sheppingPrice">
                {shippingPrice === 0 ? "Free" : `${shippingPrice.toFixed(2)}  ${curSession.currencySym ?? "GBP"}`}
              </p>
            </div>
            <div className="flex justify-between text-sm text-gray-700 font-semibold border-t border-gray-300 pt-4">
              <p>Total</p>
              <p>{grandTotal.toFixed(2)}  {curSession.currencySym ?? "GBP"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
