import Banner from "@/components/pages/portraits/Banner";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { formatDistanceToNow } from 'date-fns';

type News = {
  id: number;
  title: string;
  thumbnail_image: string;
  created_at: string;
};

export const metadata: Metadata = {
  title: "Latest News &amp; Update | Hand Drawing Family Pencil Portraits",
  description: "Mark Drawing",
};

const Page = async () => {
  
  let news: News[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.API_URL}/api/V1/news/0`, {
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

  const formatDate = (dateString: string) => {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Format the date to show full month name and day (e.g., "September 1, 2023")
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(date);

    // Calculate "time ago" (e.g., "2 years ago")
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });

    if (timeAgo.startsWith('almost')) {
      timeAgo = timeAgo.slice(7); // Removes the first 7 characters: 'almost '
    }else{
      timeAgo = timeAgo.slice(6);
    }

    return { formattedDate, timeAgo };
  };

  return (
    <main>
      <Banner text="News" />
      <section>
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-4 gap-5 py-20">
            <div className="col-span-3">
              <div className="grid md:grid-cols-2 gap-10">
                {news.map((item) => {
                  const { formattedDate, timeAgo } = formatDate(item.created_at);
                  
                  return (
                    <div key={item.id}>
                      <div className="relative border border-[#ccc] p-2">
                        <Image
                          src={item.thumbnail_image}
                          alt={item.title}
                          width={600}
                          height={400}
                        />
                        <span className="bg-[#2bb673] text-white p-2 uppercase absolute left-0 top-0 text-[15px]">
                          {timeAgo}
                        </span>
                      </div>
                      <div className="pt-[25px] pb-3">
                        <h3 className="text-[1.75rem] text-xl font-medium mb-5">
                          {item.title}
                        </h3>
                        <Link href={`/news/${item.id}`}>
                          <button
                            aria-label="Read More"
                            className="bg-[#2BB673] px-[10px] py-[5px] text-white font-bold text-lg rounded shadow transition-transform duration-300 ease-in-out hover:bg-[#239e58] hover:shadow-lg"
                            type="button"
                          >
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-1 px-2">
              <h3 className="text-[#3eb672] text-3xl font-semibold pb-3">
                Recent Posts
              </h3>
              <div>
                {news.map((item) => {
                  const { formattedDate, timeAgo } = formatDate(item.created_at);
                  
                  return (
                    <div className="py-8 border-b border-b-[#ccc]" key={item.id}>
                      <h3 className="text-[#161616] mb-5">{item.title}</h3>
                      <p className="text-sm text-[#606060]">
                        {formattedDate}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
