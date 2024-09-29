import React from "react";
import Card from "./Card";

// Define types for canvas data
type CanvasItem = {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: string;
  country: string[]; // Parse country as an array of strings
};

// Update CurrencySessionData type to be a single object
interface CurrencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

type ProductProps = {
  canvases: CanvasItem[];
  currencySessionData: CurrencySessionData; // Change to a single object
};

const Products: React.FC<ProductProps> = ({ canvases, currencySessionData }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {canvases.map((item) => (
        <Card key={item.id} {...item} currencySessionData={currencySessionData} />
      ))}
    </div>
  );
};

export default Products;
