import Image from "next/image";
import Link from "next/link";
import React from "react";
import payment from "@/assets/footer/payment.png";

type News = {
  id: number;
  title: string;
  thumbnail_image: string;
};

const Footer = async () => {
  let news: News[] = [];
  let error: string | null = null;
  try {
    const res = await fetch(`${process.env.API_URL}/api/V1/news/1`, {
      next: { revalidate: 10 }, 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    
    if (data.status === "success") {
      news = data.data.news;
    } else {
      error = "Failed to load news.";
    }
  } catch (err) {
    error = "An error occurred while fetching the data.";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <footer className=" text-[#69727b] ">
      <div className="w-full h-1 bg-[#2bb673]"></div>
      <div className="bg-[#F7F6F9] px-[5%] py-[100px]">
        <div className="container mx-auto py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <div>
                <p className="relative text-2xl font-bold pb-2 text-[#69727b]">
                  LATEST NEWS
                </p>
                <span className="inline-block w-12 h-1 bg-[#2bb673]"></span>
              </div>
              <p className="pt-3 text-[#69727b]">
                {news && news[0].title}
              </p>
              <Image
                src={news && news[0].thumbnail_image}
                alt={news && news[0].title}
                className="w-52 h-auto"
                width={200}
                height={200}
              />
              <p className="italic pt-3">
                <strong></strong>
              </p>
            </div>
            <div>
              <p className="relative text-2xl font-bold pb-2 text-[#69727b]">
                QUICK LINKS
              </p>
              <span className="inline-block w-12 h-1 bg-[#2bb673]"></span>
              <div className="pt-3">
                {[
                  {
                    link: "/track-your-order",
                    text: "TRACK YOUR ORDER",
                  },
                  {
                    link: "/contact",
                    text: "CONTACT",
                  },
                  { link: "/faq", text: "FAQ" },
                  {
                    link: "/terms",
                    text: "TERMS & CONDITIONS",
                  },
                  {
                    link: "/family-portrait/118?q=1",
                    text: "FAMILY PORTRAIT",
                  },
                  { link: "/news", text: "NEWS" },
                  {
                    link: "/privacy",
                    text: "PRIVACY & REFUND POLICY",
                  },
                  {
                    link: "/delivery-return-policy",
                    text: "DELIVERY & RETURNS POLICY",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex pb-5 font-semibold text-sm">
                    <Link href={item.link}>
                      <p className="flex items-center font-semibold  hover:text-[#2bb673]">
                        <i className="fas fa-chevron-right mr-2 text-[#2bb673]"></i>
                        <span>{item.text}</span>
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="relative text-2xl font-bold pb-2 text-[#69727b]">
                NEWSLETTER
              </p>
              <span className="inline-block w-12 h-1 bg-[#2bb673]"></span>
              <p className="pt-3">
                Sign up for the latest news, offers and styles
              </p>
              <form className="pt-3">
                <input
                  type="hidden"
                  name="_token"
                  value="e2bXX6OQO6WqkOw3G9W6tyNrOOHwF85IPDrMCBHk"
                />
                <input
                  name="email"
                  type="email"
                  className="form-control w-full mb-3 p-3 border text-[#495057] bg-white border-[#ddd] rounded-[.3rem] text-lg"
                  placeholder="Email address"
                  required
                />
                <input
                  type="submit"
                  className="w-full py-[10px] px-6 bg-[#28a745] text-white rounded-[.25rem] shadow-none"
                  value="SUBSCRIBE"
                />
              </form>
            </div>
            <div>
              <p className="relative text-2xl font-bold pb-2 text-[#69727b]">
                PAYMENT METHODS
                <span className="inline-block w-12 h-1 bg-[#2bb673]"></span>
              </p>
              <Image
                src={payment}
                alt="PAYMENT METHODS"
                className="mt-3"
                width={300}
                height={200}
              />
            </div>
          </div>

          <hr className="my-5 border border-[#ddd]" />
          <div className="text-center">
            <p className="py-1 font-bold ">
              © 2024, Markdrawing. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
