import Image from "next/image";
import React from "react";
import FeaturedCards from "@/components/shared/ui/FeaturedCards";

type PortraitItem = {
  image: string;
};

type Oilpaint = boolean

type PortraitsCardProps = {
  portraits: PortraitItem[];
  oilpaint:Oilpaint
};



const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const PortraitsCard: React.FC<PortraitsCardProps> = async ({ portraits = [], oilpaint }) => {

  const url = oilpaint
  ? `${process.env.API_URL}/api/V1/oil-paint`
  : `${process.env.API_URL}/api/V1/products/1`;

  const productsData = await fetchData(url);
  const products = productsData.data.products || [];

  if (!Array.isArray(portraits)) {
    return <div>Error: Invalid portraits data.</div>;
  }

  return (
    <section className="py-5 lg:py-[50px]">
      <div className="container">
        <div className="max-w-[75%] lg:max-w-[80%] mx-auto lg:mx-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
            {portraits.map((portrait, index) => (
              <div key={index} className="relative">
                <Image
                  src={portrait.image}
                  alt={`Portrait ${index}`}
                  className="p-5 header__mobile_menu border bg-white"
                  width={500} // Define width explicitly
                  height={500} // Define height explicitly
                  quality={75} // Reduce quality for smaller file size
                  layout="responsive" // Serve responsive images based on screen size
                  priority // Preload if this image is critical for performance
                  style={{ objectFit: "cover" }} // Ensure proper scaling and layout
                />
              </div>
            ))}
          </div>
        </div>
        <FeaturedCards products={products} oilpaint ={oilpaint} />
      </div>
    </section>
  );
};



export default PortraitsCard;
