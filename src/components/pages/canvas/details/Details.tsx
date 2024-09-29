"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sliders from "@/components/pages/productDetails/Sliders";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

type Price = {
  id: number;
  canvas_id: number;
  size: string;
  price: number;
};

type ProductData = {
  id: number;
  title: string;
  description: string;
  rating: number;
  country: string[];
  prices: Price[];
  images: string[];
};

interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

// Client-side component for managing state
const CanvasDetail = ({ product }: { product: ProductData }) => {
  const [selectedCanvas, setSelectedCanvas] = useState<Price | null>(null);
  const [curSession, setCurSession] = useState<currencySessionData>({});
  const router = useRouter();

  useEffect(() => {
    let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
    if (currencySession) {
      setCurSession(currencySession)
    }

    if (product.prices.length > 0) {
      // Sort prices by the `price` value and set the smallest one as default
      const smallestPrice = product.prices.reduce((min, current) =>
        current.price < min.price ? current : min
      );
      setSelectedCanvas(smallestPrice);
    }
  }, [product.prices]);
  
  const canvasHandleCheckboxChange = (canvas: Price) => {
    setSelectedCanvas(canvas);
  };

    const cartItem = {
      price: selectedCanvas ? selectedCanvas.price : 0,
      id: product.id, 
      productTitle: product.title, 
      person:1,
      country: curSession.countryCode,
      canvasOption: selectedCanvas ? selectedCanvas.size:'',
      canvasPrint: '',
      canvasOptionName: product.title,
      canvasPrintName: '',
      radioColor: '',
      notes: '',
      image:product.images[0],
      type:"canvas",
    };


    const addToCart = () => {

      let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id === cartItem.id && item.canvasOption === cartItem.canvasOption
      );

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1; // Increment quantity by 1
      } else {
        cartItems.push({ ...cartItem, quantity: 1 }); // Start with quantity of 1
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Updated cart items:", cartItems);
      router.push('/carts');
  }


           
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-wrap">
          {/* Product image slider */}
          <Sliders images={product.images ?? []} />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* Product brand and title */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>

            {/* Product rating */}
            <div className="flex mb-4">
              <span className="flex items-center">
                {Array(product.rating).fill("").map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2z"></path>
                  </svg>
                ))}
              </span>
            </div>

            {/* Product description */}
            <p className="leading-relaxed">{product.description}</p>

            {/* Canvas size options */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="">
                <label className="mr-3"><strong>Canvas Size :</strong></label>

                <div className="grid grid-cols-3 gap-5 mt-5 text-[15px]">
                  {product.prices.map((price) => (
                    <div key={price.id} className="flex gap-2 items-center">
                      <input
                        id={`frame-${price.id}`}
                        className="form-check-input canvas-Print"
                        type="checkbox"
                        name="canvasPrint[]"
                        value={price.id}
                        checked={selectedCanvas?.id === price.id}
                        onChange={() => canvasHandleCheckboxChange(price)}
                      />
                      <label className="form-check-label" htmlFor={`frame-${price.id}`}>
                        {price.size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart button */}
            <div className="flex mt-6 justify-between items-center">
                {/* Price display */}
                <h3 className="text-[#2BB673] font-bold text-[1.75rem]">
                    {selectedCanvas ? (selectedCanvas.price * (curSession.currencyValue || 1)).toFixed(2) : "0.00"} ({curSession.currencySym ?? "GBP"})
                </h3>

                {/* Add to Cart button */}
                <button
               
                aria-label="Add to Cart"
                className="bg-[#2BB673] px-[10px] py-[5px] text-white font-bold text-lg rounded shadow transition-transform duration-300 ease-in-out hover:bg-[#239e58] hover:shadow-lg"
                id="Cart"
                onClick={addToCart}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CanvasDetail;