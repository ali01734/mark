"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

interface ISliders {
  images: string[];
}

const Sliders: React.FC<ISliders> = ({ images }) => {
  // Set the first image in the array as the main image by default
  const [mainImage, setMainImage] = useState(images[0]);

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    accessibility: true,
  };

  return (
    <div className="lg:w-1/2 w-full">
      {/* Main product image */}
      <Image
        alt="Product main view"
        className="lg:w-full w-full lg:h-auto h-64 object-cover object-center rounded"
        src={mainImage}
        width={400}
        height={200}
      />

      {/* Thumbnail Slider */}
      <div className="mt-4">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-2">
              <button
                aria-label={`View image ${index + 1}`}
                onClick={() => setMainImage(image)}
                className="focus:outline-none"
              >
                <Image
                  alt={`Product thumbnail ${index + 1}`}
                  className={`w-full h-32 object-cover object-center rounded cursor-pointer ${
                    mainImage === image ? "border-2 border-indigo-500" : ""
                  }`}
                  src={image}
                  width={100}
                  height={100}
                />
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Sliders;
