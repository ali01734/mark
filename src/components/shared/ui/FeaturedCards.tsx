"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Oilpaint = boolean;

type FeaturedCardsProps = {
  products: Product[];
  oilpaint: Oilpaint;
};

interface CurrencySessionData {
  countryCode?: string;
  currencySym?: string;
  currencyValue?: number;
  countryId?: number;
}

const FeaturedCards: React.FC<FeaturedCardsProps> = ({ products = [], oilpaint }) => {
  const [curSession, setCurSession] = useState<CurrencySessionData>({});

  useEffect(() => {
    const currencySession = localStorage.getItem("currencySession");
    if (currencySession) {
      setCurSession(JSON.parse(currencySession));
    }
  }, []);

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available at the moment.</div>;
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
        {products.map((item) => (
            <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="bg-white p-5 border h-full flex flex-col header__mobile_menu"
            >
              <div className="flex-grow">
                <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    layout="responsive"
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 500px"
                    quality={50} // Experiment with even lower values to save more bandwidth
                    loading="lazy" // Lazy load for non-critical images
                    priority={false} // Use priority for above-the-fold images only
                />

              </div>

              <div className="flex-grow flex flex-col justify-between">
                <h3 className="py-4 text-black text-center font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-black hover:text-[#2bb573] text-center mb-5">
                <span>
                  {curSession.currencyValue !== undefined
                      ? (item.price * curSession.currencyValue).toFixed(2)
                      : '---'} {/* Placeholder to avoid layout shifts */}
                </span>{" "}
                  <span>({curSession.currencySym ?? "GBP"})</span>
                </p>
                <div className="text-center">
                  <button
                      aria-label="Buy now"
                      className="w-full border-[#28a745] border text-[#28a745] hover:bg-[#28a745] hover:text-white px-3 py-[6px] rounded"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
        ))}
      </div>

  );
};

export default FeaturedCards;
