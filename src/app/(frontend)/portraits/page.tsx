import Banner from "@/components/pages/portraits/Banner";
import PortraitsCard from "@/components/pages/portraits/PortraitsCard";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Hand Drawn Pencil Portraits from Photos | Portraits From Photos",
  description: "Mark Drawing",
};

const Page = async () => {
  const oilpaint: boolean = false;

  return (
    <main>
      <section className="pb-20">
        <div className="container">
          <PortraitsCard oilpaint ={oilpaint} />
        </div>
      </section>
    </main>
  );
};

export default Page;
