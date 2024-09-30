import Banner from "@/components/pages/portraits/Banner";
import PortraitsCard from "@/components/pages/portraits/PortraitsCard";
import { Metadata } from "next";
import React from "react";

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
  const oilpaint: boolean = true;
  return (
    <main>
      <Banner text="oil paint" />
      <PortraitsCard oilpaint ={oilpaint} />
    </main>
  );
};

export default Page;
