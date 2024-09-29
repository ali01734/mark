import Banner from "@/components/pages/portraits/Banner";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <main>
      <Banner text="Terms and Conditions" />
      <section className="py-[50px]">
        <div className="container mx-auto px-10">
          <div className="max-w-[900px]">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">OWNERSHIP</h5>
                  <p className="text-sm text-[#69727B]">
                    All drawings that are made by &apos;Mark Drawings&apos;.
                    When obtaining a picture this gives you individual eminence
                    free utilize of the picture on anything you see fit. Trade
                    utilize of the pictures have to be be cleared by
                    administration some time recently utilize. You will
                    replicate the drawing in any organize essential and as
                    numerous times as you like. Mark Drawings may utilize your
                    drawing/photo as portion of any promoting campaign online or
                    offline as they see fit. In the event that you ask for this
                    not to happen by e-mail at that point this will not be the
                    case.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">TIME </h5>
                  <p className="text-sm text-[#69727B]">
                    Although the regular holding up time for the pictures is 3
                    to 5 days for the work of Portraits and after that a
                    encourage 4 to 5 for shipment. In active periods this may
                    change. I inquire exceptionally respectfully that if after 5
                    working days you&apos;ve got not gotten an mail along with
                    your picture if it&apos;s not too much trouble contact me at
                    that point. Any emails or messages gotten on this subject
                    some time recently that date will not be replied until the
                    7th day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default page;
