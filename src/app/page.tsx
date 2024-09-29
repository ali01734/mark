import Banner from "@/components/pages/home/Banner";
import Featured from "@/components/pages/home/Featured";
import OrderProcess from "@/components/pages/home/OrderProcess";
import Portraits from "@/components/pages/home/Portraits";
import Sliders from "@/components/pages/home/Slider";
import Footer from "@/components/shared/ui/Footer";
import Header from "@/components/shared/ui/Header";
import Image from "next/image";
import dynamic from 'next/dynamic';

const PaymentNotification = dynamic(() => import('@/components/shared/ui/SuccessNotification '), { ssr: false });

export default function Home() {
  return (
    <main>
      <Header />
      <PaymentNotification />
      <Banner />
      <Featured />
      <Sliders />
      <Portraits />
      <OrderProcess />
      <Footer />
    </main>
  );
}
