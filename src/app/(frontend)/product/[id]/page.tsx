import DetailsSection from "@/components/pages/family-portrait/DetailsSection";
import Banner from "@/components/pages/portraits/Banner";
import React from "react";

// Define the product type
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

// Fetch product data from the API
const fetchProductData = async (id: number): Promise<Product | null> => {
  try {
    const apiUrl = `${process.env.API_URL}/api/V1/product-details/${id}`;
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product data: ${res.status}`);
    }

    const responseData = await res.json();
    const product = responseData.data?.product;
    
    if (!product) {
      throw new Error("Product data is missing from the response.");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};

  const fetchPrintFrame = async (productId: number, countryId: number) => {
    try {
      const apiUrl = `${process.env.API_URL}/api/V1/get-print-frame/${productId}/${countryId}`;
     
      const res = await fetch(apiUrl, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        console.error("API response status:", res.status);
        throw new Error(`Failed to fetch product data: ${res.status}`);
      }
  
      const responseData = await res.json();
      const resData = responseData.data;
      return resData;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };
  

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const product = await fetchProductData(id);

  const printAndCanvasData = await fetchPrintFrame(id,9);
  const printData = printAndCanvasData.print;
  const canvasData = printAndCanvasData.canvas;
  const countryData = printAndCanvasData.country;
  const oilPrintStatus = printAndCanvasData.oilPrintStatus?.oil_paint_status === 1;

  if (!product) {
    return <div>An error occurred while fetching the product data.</div>;
  }
  if (!printData) {
    return <div>An error occurred while fetching the print data.</div>;
  }
  if (!canvasData) {
    return <div>An error occurred while fetching the canvas data.</div>;
  }
  if (!countryData) {
    return <div>An error occurred while fetching the country data.</div>;
  }

  return (
    <main>
      <Banner text="Hand Drawing Family Pencil Portraits" />
      <DetailsSection 
        product={product} 
        printData={printData} 
        canvasData={canvasData} 
        countryData={countryData} 
        oilPrintStatus={oilPrintStatus} 
      />
    </main>
  );
};

export default ProductPage;
