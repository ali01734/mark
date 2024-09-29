
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number;
  productTitle: string;
  price: number;
  quantity: number;
  canvasOption: number;
  canvasPrint: number;
  canvasOptionName: string;
  canvasPrintName: string;
  radioColor: string;
  country: string;
  person: string;
  image: string;
  type:string,
}

interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}



const CartComponent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [curSession, setCurSession] = useState<currencySessionData>({});
  const [country, setCountry] = useState<number | null>(null);

  const router = useRouter();
  // Calculate subtotal
  const getSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]); 
  const [subtotal, setSubtotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
    if (currencySession) {
      setCurSession(currencySession)
      setCountry(currencySession.countryId )

    }
    
  
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        } catch (e) {
          console.error("Error parsing cart items:", e);
          setCartItems([]); // In case of error, initialize with an empty array
        }
      }
    }
  }, []);


  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);


  // Update subtotal when cart items change
  useEffect(() => {
    setSubtotal(getSubtotal());
  }, [getSubtotal]);

  // Update grand total whenever subtotal or discount changes
  useEffect(() => {
    setGrandTotal(subtotal - discount);
  }, [subtotal, discount]);

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const applyCoupon = async () => {

    if (grandTotal < 1) {
      setStatus('error');
      setMessage('No cart found');
      return; // Stop execution if there's no cart
    }

  
    try {

      const couponData = {
        couponName: couponCode,
        totalPrice: subtotal,
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/web-coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      const result = await response.json();
      console.log(result)
      if (result.status === 'success') {
        const dis = parseFloat(result.discount)

        const couponData = {
          baseTotalPrice: result.baseTotalPrice * (curSession.currencyValue || 1),
          discountAmount: dis * (curSession.currencyValue || 1),
          discountPercent: result.discountPercent,
          couponId: result.couponId,
        };

        localStorage.setItem("couponData", JSON.stringify(couponData));

        setDiscount(dis);
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error:any) {
      setStatus('error');
      setMessage('An error occurred');
    }



    // if (couponCode === "DISCOUNT10") {
    //   const discountValue = subtotal * 0.1; // 10% discount
    //   setDiscount(discountValue);
    // } else {
    //   setDiscount(0); // No discount if coupon is invalid
    //   alert("Invalid Coupon Code");
    // }

  };

  const checkOut =  () => {
    localStorage.setItem("totalPrice", String((grandTotal * (curSession.currencyValue || 1))));
    router.push('/checkout');
  }


  return (
    <div className="container mx-auto pt-10 pb-32 px-10">
      <div className="hidden lg:block mobileTable" id="largeDeviceHeader">
        <div className="grid grid-cols-12 text-center bg-[#3EB571] py-4">
          <div className="col-span-6">
            <p className="font-bold text-white">Product</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-white">Price</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-white">Quantity</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-white">Total</p>
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b py-4">
              {/* Image */}
              <div className="sm:col-span-2 flex justify-center sm:justify-start">
                <a href="#" className="block">
                  <Image
                    width={100}
                    height={100}
                    className="w-24 h-24 object-contain"
                    src={item.image}
                    alt={item.productTitle}
                  />
                </a>
              </div>

              {/* Product Info */}
              <div className="sm:col-span-4 text-center sm:text-left">
                <a
                  href="#"
                  className="font-medium text-gray-700 hover:underline"
                >
                  {item.productTitle}
                </a>

                <p className="text-gray-600 text-sm mt-1">
                  {item.type === "canvas" ? (
                    <>
                      Canvas Size: {item.canvasOption}
                      <br />
                    </>
                  ) : (
                    <>
                      <>
                      Where are you ordering from? (MUST BE SELECTED 1st): {item.country}
                      <br />
                      How many people / pets?: {item.person} person
                      <br />
                      {/* Conditionally render canvas option */}
                      {item.canvasOptionName && (
                        <>
                          Add a canvas Option? (pick as many as you like): {item.canvasOptionName}
                          <br />
                        </>
                      )}
                      {/* Conditionally render canvas print */}
                      {item.canvasPrintName && (
                        <>
                          Add a canvas Print? (pick as many as you like): {item.canvasPrintName}
                          <br />
                        </>
                      )}
                      {/* Conditionally render frame color */}
                      {item.radioColor && (
                        <>
                          Frame Colour: {item.radioColor}
                          <br />
                        </>
                      )}
                    </>
                    </>
                  )}
                </p>

                <a
                  className="text-[#3EB571] hover:text-[#3EB571] cursor-pointer"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </a>
              </div>

              {/* Price */}
              <div className="sm:col-span-2 text-center">
                <p className="text-lg font-semibold">
                  <span className="currencyCartSection">
                    {(item.price * (curSession.currencyValue || 1)).toFixed(2)}
                  </span>{" "}
                  {curSession.currencySym ?? "GBP"}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="sm:col-span-2 flex justify-center sm:justify-start items-center space-x-2">
                <button
                  className="btn bg-[#3EB571] text-white px-2 py-1"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <input
                  className="w-10 text-center border rounded-md"
                  type="text"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="btn bg-[#3EB571] text-white px-2 py-1"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              {/* Total Price */}
              <div className="sm:col-span-2 text-center">
                <p className="text-lg font-semibold">
                  <span className="subtotal_0">
                    {(item.price * (curSession.currencyValue || 1) * item.quantity).toFixed(2)}
                  </span>{" "}
                  {curSession.currencySym ?? "GBP"}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="lg:col-span-4 lg:col-start-9 text-right pt-4">
        <span className="text-gray-700">Discount Code</span>
        <div className="flex flex-col sm:flex-row mb-5 mt-2 w-full sm:w-1/2 lg:w-1/3 ml-auto">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full  rounded-md sm:rounded-none sm:rounded-l-md focus:outline-none"
            id="coupon"
            placeholder="Coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="bg-[#3EB571] text-white font-bold px-4 py-2 mt-2 sm:mt-0 sm:rounded-r-md sm:ml-2 rounded-md sm:rounded-none"
            onClick={applyCoupon}
          >
            Apply
          </button>
        </div>

        {/* {status === 'success' && (
        <div className="bg-green-100 text-green-700 p-3 mt-4 rounded-md">
          <p>{message}</p>
        </div>
      )} */}
      {status === 'error' && (
        <div className="bg-red-100 text-red-700 p-3 mt-4 rounded-md">
          <p>{message}</p>
        </div>
      )}

        <div className="text-gray-700 mb-4">
          <span className="font-semibold">Discount:</span>{" "}
          <span id="discount">{(discount * (curSession.currencyValue || 1)).toFixed(2)}</span>  {curSession.currencySym ?? "GBP"}
        </div>

        <div className="text-gray-700 mb-4">
          <span className="font-semibold">Grand Total:</span>{" "}
          <span id="result1">{(grandTotal * (curSession.currencyValue || 1)).toFixed(2)}</span>  {curSession.currencySym ?? "GBP"}
        </div>

        <p className="text-sm text-gray-500">
          Taxes and shipping calculated at checkout
        </p>

        <div className="mt-4">
          <button className="bg-transparent border-2 border-[#3EB571] text-[#3EB571] font-semibold px-4 py-2 mr-2 hover:bg-[#3EB571] hover:text-white transition">
            Update
          </button>
          
          <button className="bg-[#3EB571] text-white font-semibold px-4 py-2 hover:bg-[#3EB571] transition"  onClick={checkOut}>
            Check out
          </button>
        
        </div>

        <div className="mt-3 text-right ">
          <h6 className="mt-2 text-[#3EB571]">Secure Checkout With</h6>
          <Image
            className="border p-2 mt-2 ml-auto"
            width={200}
            height={50}
            alt="Secure Checkout"
            src="https://markdrawing.com/images/SecureCheckoutWith.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
