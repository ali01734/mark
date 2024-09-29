"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import Show from "./Show";
import SortBy from "./ShortBy";
import Products from "./Products";

// Define types for canvas data
type CanvasItem = {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: string;
  country: string[]; // Parse country as an array of strings
};

type ProductProps = {
  canvases: CanvasItem[]; // Expecting an array of CanvasItem
};

interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

const Product: React.FC<ProductProps> = ({ canvases }) => {
  const [curSession, setCurSession] = useState<currencySessionData>({});
  useEffect(() => {
    let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
    if (currencySession) {
      setCurSession(currencySession)
    }
  }, []);

  return (
    <div className="w-full">
      {/* Sort and Filter Controls */}
      <div className="flex justify-end items-center gap-2 mb-9">
        <Show />
        <SortBy />
      </div>

      {/* Pass the dynamic canvases to Products */}
      <Products canvases={canvases} currencySessionData={curSession} />
    </div>
  );
};

export default Product;
