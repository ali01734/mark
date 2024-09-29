import React from "react";
import Banner from "@/components/pages/portraits/Banner";
import Image from "next/image";
import { Metadata } from "next";
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: " Specialty Of Best Black White Portrait",
  description: "Mark Drawing",
};

type News = {
  id: number;
  title: string;
  thumbnail_image: string;
  content: string;
  created_at: string;
};


const fetchNewsData = async (id: number): Promise<News> => {
  const res = await fetch(`${process.env.API_URL}/api/V1/news-details/${id}`, {
    next: { revalidate: 10 }, // ISR, will revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  return data.data.news;
};

const Page = async ({ params }: { params: { id: string } }) => {
  let news: News | null = null;
  let error: string | null = null;

  try {
    const id = parseInt(params.id, 10); // Convert the id from string to number
     news = await fetchNewsData(id);
  } catch (err) {
    error = "An error occurred while fetching the product data.";
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Add a null check before rendering CanvasDetail
  if (!news) {
    return <div>No news found.</div>;
  }
  const formatDate = (dateString: string) => {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Format the date to show full month name and day (e.g., "September 1, 2023")
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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

  const { formattedDate, timeAgo } = formatDate(news.created_at);

  return (
    <main>
      <Banner text="News" />
      <section className="py-32">
        <div className="container mx-auto px-10 ">
          <div className="grid grid-cols-3">
            <div className="relative col-span-2">
              <div className="border border-[#ccc] relative p-2">
                <Image
                  src={news.thumbnail_image}
                  alt={news.title}
                  width={600}
                  height={400}
                />
                <span className="bg-[#2bb673] text-white p-2 uppercase absolute left-0 top-0 text-[15px]">
                  {formattedDate}
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-[#007bff] text-3xl font-medium">
                  {news.title}
                </h2>
                <div
                    className="text-[11px] text-black"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page;
