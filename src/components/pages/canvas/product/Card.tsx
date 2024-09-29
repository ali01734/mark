import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

// Define the type for currency session data
interface CurrencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

type CardProps = {
  image: string; // Single image URL
  title: string;
  price: number; // Single price value
  rating: number;
  id: number;
  currencySessionData: CurrencySessionData; // Change to a single object
};

const Card: React.FC<CardProps> = ({ image, title, price, rating, id, currencySessionData }) => {
  // You can use currencySessionData here if needed

  return (
    <Link
      href={`/canvas/${id}`}
      className="card bg-white p-3 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div>
        <Image
          src={image || "/default-image.jpg"} // Fallback if no image
          alt={title}
          width={300}
          height={300}
          className="rounded-md object-cover"
        />
      </div>
      <div className="p-2 text-center text-[#333333]">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm font-semibold">{(price* (currencySessionData.currencyValue || 1)).toFixed(2)} ({currencySessionData.currencySym ?? "GBP"})</p> {/* Assuming price is in GBP */}
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} className="text-sm text-[#FFD700]" />
          ))}
          <p className="text-sm text-gray-500">({rating})</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
