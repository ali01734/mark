"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Banner: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch slider images from the API
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/slider-image`);
        const data = await response.json();
        if (data.status === "success") {
          if (data.data.sliders.length > 0) {
            setCurrentImage(data.data.sliders[0]); // Set the first image as the current image
          }
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  return (
      <section className="relative overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[496px]">
        {currentImage && (
            <Image
                className="absolute top-0 left-0 w-full h-full object-contain object-center"
                src={currentImage}
                alt="Banner Image"
                width={1371}
                height={496}
                priority
                loading="eager"
                quality={70}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 1371px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/path/to/default/image.jpg'; // Fallback image
                }}
            />
        )}
      </section>


  );
};

export default Banner;
