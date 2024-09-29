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
    const [reviewRes, productsRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/V1/review-image/1`, {
        next: { revalidate: 10 },
      }),
      fetch(`${process.env.API_URL}/api/V1/products/1`, {
        next: { revalidate: 10 },
      }),
    ]);

    // Handle errors for both requests
    if (!reviewRes.ok) {
      throw new Error(`Review Images API error! Status: ${reviewRes.status}`);
    }
    if (!productsRes.ok) {
      throw new Error(`Products API error! Status: ${productsRes.status}`);
    }

    // Parse responses
    const reviewData: FeatureData = await reviewRes.json();
    const productsData: ProductData = await productsRes.json();

    // Assign fetched data
    features = reviewData.data.reviewImages;
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

        {/* Display fetched review images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
          {features.map((feature, index) => (
            <div key={index} className="">
              <Image
                  src={feature}
                  alt={`Feature image ${index + 1}`}
                  width={500}
                  height={500}
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="/path/to/placeholder.jpg"
                  className="p-5 header__mobile_menu border bg-white"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                />
            </div>
          ))}
        </div>

        {/* Pass products and oilpaint to FeaturedCards */}
        <FeaturedCards products={products} oilpaint={oilpaint} />
      </div>
    </section>
  );
};

export default Featured;
