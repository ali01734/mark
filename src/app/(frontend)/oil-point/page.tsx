import Banner from "@/components/pages/portraits/Banner";
import PortraitsCard from "@/components/pages/portraits/PortraitsCard";
import { Metadata } from "next";
import React from "react";

type PortraitItem = {
  image: string;
};

type PortraitData = {
  data: {
    reviewImages: string[];
  };
};

export const metadata: Metadata = {
  title: "Hand Drawn Pencil Portraits from Photos | Portraits From Photos",
  description: "Mark Drawing",
};

const Page = async () => {
  let portraits: PortraitItem[] = [];
  let error: string | null = null;
  const oilpaint: boolean = true;
  try {
    const res = await fetch(`${process.env.API_URL}/api/V1/review-image/1`, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: PortraitData = await res.json();

    if (data.data && Array.isArray(data.data.reviewImages)) {
      portraits = data.data.reviewImages.map(image => ({ image }));
    } else {
      error = "Data format is incorrect.";
    }
  } catch (err) {
    error = `An error occurred while fetching the data: ${err instanceof Error ? err.message : 'Unknown error'}`;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Banner text="oil paint" />
      <PortraitsCard portraits={portraits} oilpaint ={oilpaint} />
    </main>
  );
};

export default Page;
