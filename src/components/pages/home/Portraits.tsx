import React from "react";
import image from "@/assets/home/portraits/orginalone.png";
import Image from "next/image";

type PortraitsProps = {};

const Portraits: React.FC<PortraitsProps> = () => {
  return (
    <section className="py-[120px] px-10 lg:pl-[120px] bg-[#F9F9F9]">
      <div className="flex flex-wrap">
        <div className="lg:max-w-[66.66%] ">
          <div className="border border-[#ccc] px-8 py-5 relative">
            <div className="absolute -left-5 -top-5 border border-[#ccc] w-full h-[104%]"></div>
            <h3 className="text-4xl font-bold">
              <span className="text-[#2bb573]">Portraits</span>{" "}
              <span>from your photos</span>
            </h3>
            <div className="text-[#69727B] my-5 flex flex-col gap-5">
              <p>
                The Only Place to get your family portraits or any hand drawing
                portraits drawings from your photos. You will provide your
                favorite photos of your favorite persons or your favorite pet
                and our team will turn them into fantastic portraits.
              </p>
              <p>
                You&apos;ll be able to take a photo off your phone or camera and
                transfer it at that point arrange on our site, yes it’s truly
                that easy. Not only our portraits amazing stunning they are very
                cost-effective with prices from just £12.99.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:max-w-[33.33%]">
          <Image src={image} alt="Portraits" width={300} height={300}  layout="intrinsic"  priority={true}/>
        </div>
      </div>
    </section>
  );
};
export default Portraits;
