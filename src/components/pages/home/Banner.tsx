"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";

// Slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
};

const Banner: React.FC = () => {
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  // Fetch slider images from the API
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/slider-image`);
        const data = await response.json();
        if (data.status === "success") {
          setSliderImages(data.data.sliders);
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  return (
    <section className="overflow-hidden">
      <Slider {...settings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <Image
                className="w-full h-full slider-image" // Custom class for aspect ratio
                src={image}
                alt={`Banner ${index + 1}`}
                width={1371}
                height={496}
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'} // Corrected to fetchPriority
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 1371px"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/path/to/default/image.jpg'; }} // Fallback image
              />
            </div>
          ))}
        </Slider>

    </section>
  );
};

export default Banner;
