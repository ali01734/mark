"use client"; // Ensures the component runs on the client side
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import Slick CSS
import "slick-carousel/slick/slick-theme.css";

interface Video {
  url: string;
  title: string;
}

const Sliders: React.FC = () => {
  const [sliders, setSliders] = useState<Video[]>([]); // Type for sliders data
  const [loading, setLoading] = useState<boolean>(true); // Explicit boolean type for loading state

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/youtube-slider`);
        const data = await res.json();
        setSliders(data.data.youtube_slider || []); // Update the slider data
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run only once when the component mounts

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    accessibility: true,
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Display loading message
  }

  if (sliders.length === 0) {
    return <div className="text-center">No videos available</div>; // Handle no data case
  }

  return (
      <section className="py-20">
        <div className="container mx-auto">
          <Slider {...settings}>
            {sliders.map((video: Video, index: number) => (
                <div key={index} className="p-3 shadow-lg m-2 rounded-lg"> {/* Adjusted margin for responsiveness */}
                  {/* Embedded YouTube video */}
                  <iframe
                      src={`https://www.youtube.com/embed/${video.url}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="w-full h-48 md:h-72 rounded-lg"
                      allowFullScreen
                  ></iframe>
                  {/* Video title */}
                  <h3 className="mt-2 text-center text-lg font-semibold pb-4">
                    {video.title}
                  </h3>
                </div>
            ))}
          </Slider>
        </div>
      </section>
  );
};

export default Sliders;
