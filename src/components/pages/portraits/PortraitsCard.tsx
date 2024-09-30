import Image from "next/image";
import React from "react";
import FeaturedCards from "@/components/shared/ui/FeaturedCards";

type Oilpaint = boolean

type PortraitsCardProps = {
  oilpaint:Oilpaint
};


const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const PortraitsCard: React.FC<PortraitsCardProps> = async ({ oilpaint }) => {

  const url = oilpaint
  ? `${process.env.API_URL}/api/V1/oil-paint`
  : `${process.env.API_URL}/api/V1/products/1`;

  const productsData = await fetchData(url);
  const products = productsData.data.products || [];

  return (
    <section className="py-5 lg:py-[50px]">
      <div className="container">
        <FeaturedCards products={products} oilpaint ={oilpaint} />
      </div>
    </section>
  );
};



export default PortraitsCard;
