import React from "react";
import bg from "@/assets/protraits/banner.jpg";
import Image from "next/image";

type BannerProps = {
  text: string;
};

const Banner: React.FC<BannerProps> = ({ text }) => {
  return (
    <section className="relative">
      <div className="container mx-auto px-5 sm:px-0">
        <div>
          <Image
            src={bg}
            alt="banner"
            className="object-cover z-[-1] "
            fill
            sizes="100vw"
          />
          <div className="flex justify-between gap-5 text-[10px] md:text-xs text-wrap lg:text-3xl py-10 ">
            <h1 className="text-[#69727b]  italic font-bold ">Markdrawing</h1>
            <div className="w-1/2 ml-24 md:ml-0 flex justify-center">
              <p className="text-white capitalize ">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
