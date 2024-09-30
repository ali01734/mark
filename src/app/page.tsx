import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Metadata, Viewport } from 'next';
import Header from "@/components/shared/ui/Header";
import Banner from "@/components/pages/home/Banner";

// TODO: Create or import the actual SuccessNotification component
const SuccessNotification = () => <div>
  {/* <SuccessNotification /> */}
  </div>;

const Featured = dynamic(() => import("@/components/pages/home/Featured"), {
  loading: () => <div className="h-96 bg-gray-200 animate-pulse" />,
  ssr: false
});

const Portraits = dynamic(() => import("@/components/pages/home/Portraits"), {
  loading: () => <div className="h-80 bg-gray-200 animate-pulse" />,
  ssr: false
});

const OrderProcess = dynamic(() => import("@/components/pages/home/OrderProcess"), {
  loading: () => <div className="h-72 bg-gray-200 animate-pulse" />,
  ssr: false
});

const Footer = dynamic(() => import("@/components/shared/ui/Footer"), {
  loading: () => <div className="h-40 bg-gray-200 animate-pulse" />,
  ssr: false
});

export default async function Home() {
  return (
    <>
      <Header />
      <SuccessNotification />
      <Banner />
      <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse" />}>
        <Featured />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-gray-200 animate-pulse" />}>
        <Portraits />
      </Suspense>
      <Suspense fallback={<div className="h-72 bg-gray-200 animate-pulse" />}>
        <OrderProcess />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse" />}>
        <Footer />
      </Suspense>
    </>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
