"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

type ImageZoomProps = {
  images: string[]; // Accept images as a string array
};

const ImageZoom: React.FC<ImageZoomProps> = ({ images }) => {
  const [zoom, setZoom] = useState<boolean>(false);
  const source = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState<string>(images[0]); // Use the first image as default

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!source.current || !target.current) return;

    const { left, top, width, height } = source.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const targetImage = target.current.querySelector("img");

    if (targetImage) {
      const zoomFactor = 2;
      const backgroundX = (x / width) * 100;
      const backgroundY = (y / height) * 100;

      targetImage.style.transformOrigin = `${backgroundX}% ${backgroundY}%`;
      targetImage.style.transform = `scale(${zoomFactor})`;
    }
  };

  const handleMouseEnter = () => setZoom(true);
  const handleMouseLeave = () => setZoom(false);

  return (
      <div className="relative">
        <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

          <Image
              src={img} // Use the state here to display the selected image
              ref={source}
              className="w-full h-auto bg-gray-100 cursor-crosshair object-cover"
              alt="Zoomable image"
              width={400}
              height={300}
              layout="responsive"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (min-width: 769px) 50vw"
              quality={40}
              loading="eager"
              priority={true}
              placeholder="blur"
          />

          {zoom && (
              <div
                  className="absolute lg:top-0 top-[101%] -left-4 lg:left-full ml-4 w-full h-full pointer-events-none overflow-hidden shadow-2xl"
                  ref={target}
              >
                <Image
                    src={img} // Use the state here as well for the zoomed preview
                    className="w-full h-full"
                    alt="Zoomed image"
                    width={1400} // Add appropriate width
                    height={1000} // Add appropriate height
                    layout="responsive"
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 500px"
                    quality={50} // Lower value to save more bandwidth
                    loading="lazy" // Lazy load for zoomed image
                    priority={false} // Non-critical zoomed image
                />
              </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-5 rounded mt-5">
          {images.map((image, index) => (
              <div key={index}>
                <Image
                    src={image}
                    className="w-20 h-20 p-2 cursor-pointer border border-gray-300"
                    alt="Thumbnail image"
                    width={100}
                    height={75}
                    layout="responsive"
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 500px"
                    quality={50}
                    loading="lazy" // Lazy load for non-critical thumbnails
                    priority={false} // Non-critical thumbnails
                    onClick={() => setImg(image)} // Update the main image on click
                />
              </div>
          ))}
        </div>
      </div>
  );
};

export default ImageZoom;
