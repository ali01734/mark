import React from "react";
import Image from "next/image";
import Title from "@/components/shared/ui/Title";
import FeaturedCards from "@/components/shared/ui/FeaturedCards";

type FeatureData = {
  data: {
    reviewImages: string[];
  };
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ProductData = {
  data: {
    products: Product[];
  };
};

const Featured = async () => {
  let error: string | null = null;
  let features: string[] = [];
  let products: Product[] = [];
  const oilpaint = false;

  try {
    // Use Promise.all to fetch both APIs simultaneously
    const [productsRes] = await Promise.all([
       fetch(`${process.env.API_URL}/api/V1/products/1`, {
        next: { revalidate: 10 },
      }),
    ]);

    // Handle errors for both requests
    if (!productsRes.ok) {
      throw new Error(`Products API error! Status: ${productsRes.status}`);
    }

    // Parse responses
    const productsData: ProductData = await productsRes.json();

    // Assign fetched dat
    products = productsData.data.products;
  } catch (err) {
    error = `An error occurred while fetching the data: ${
      err instanceof Error ? err.message : "Unknown error"
    }`;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-[#F2F2F2] py-[50px]">
      <div className="container">
        <div className="pb-12">
          <Title title="Featured Collections" />
        </div>
        <div className="py-7 bg-[#f8f9fa] max-w-[720px] mx-auto rounded"></div>
        <FeaturedCards products={products} oilpaint={oilpaint} />
      </div>
    </section>
  );
};

export default Featured;
