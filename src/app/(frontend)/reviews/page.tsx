import Banner from "@/components/pages/portraits/Banner";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Hand Drawn Portraits from Photos",
  description: "Mark Drawing",
};

type pageProps = {
  params: {
    id: string;
  };
};

// Server-side function to fetch review images
const fetchReviewImages = async (): Promise<string[]> => {
  const res = await fetch(`https://markdrawing.com/api/V1/review-image/1`, {
    next: { revalidate: 10 }, // Revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch review images");
  }

  const data = await res.json();

  console.log("ali"+data)
  // Access the nested reviewImages from the response
  return data.data.reviewImages || [];
};

const page = async () => {
  let reviewImages: string[] = [];

  try {
    // Fetch data server-side
    reviewImages = await fetchReviewImages();
  } catch (error) {
    console.error("Error fetching review images:", error);
  }

  return (
    <main>
      <Banner text="reviews" />
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5">
          {reviewImages.length > 0 ? (
            reviewImages.map((image, index) => (
              <div key={index} className="">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  width={500}
                  height={500}
                  className="p-5 header__mobile_menu border bg-white"
                />
              </div>
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
