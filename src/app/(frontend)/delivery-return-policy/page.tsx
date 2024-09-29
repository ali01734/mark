import Banner from "@/components/pages/portraits/Banner";
import { Metadata } from "next";
import React from "react";

type pageProps = {};

export const metadata: Metadata = {
  title: " Delivery &amp; Returns Policy | Custom portrait from your photo ",
  description: "Mark Drawing",
};

const page: React.FC<pageProps> = () => {
  return (
    <main>
      <Banner text="Delivery & Returns Policy" />
      <section className="py-[50px]">
        <div className="container mx-auto px-10">
          <div className="max-w-[1100px]">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="mb-14">
                  <p className="text-base text-[#69727B]">
                    As our products are made to order and 100% personalised to
                    the customer we do not accept returns or refunds on our
                    portraits. However if you are unhappy with your portrait we
                    urge you to let us know when you receive your email preview,
                    so we can make any edits before it is sent out. This is the
                    final time this can be requested for free without any
                    further costs.
                  </p>
                </div>
                <div className="mb-14">
                  <p className="text-base text-[#69727B]">
                    All our deliveries are sent from our warehouse direct to
                    you, please allow 3 to 5 business days for postal
                    deliveries. If you would like your order tracked please make
                    sure you purchase the tracked postage upgrade on order page.
                    We do have a 2 business days delivery express option for UK
                    and Ireland only. You need to request it.
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
