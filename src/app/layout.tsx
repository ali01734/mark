import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import NonCriticalStyles from '@/components/shared/ui/NonCriticalStyles';
import '@/app/globals.css'; // Import the globals.css file
import { SpeedInsights } from "@vercel/speed-insights/next"
// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Dynamically import components to reduce initial load time
const DynamicChat = dynamic(() => import("@/components/shared/ui/chat/Chat"), {
  loading: () => <p>Loading chat...</p>,
  ssr: false,
});

const DynamicCurrencyBlocker = dynamic(() => import("@/components/shared/ui/CurrencyBlocker"), {
  loading: () => <p>Loading currency blocker...</p>,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Mark Drawing",
  description: "Mark Drawing - Professional Portrait Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <NonCriticalStyles />
      </head>
      <body>
        <DynamicCurrencyBlocker>
          <DynamicChat>{children}</DynamicChat>
        </DynamicCurrencyBlocker>
        <SpeedInsights />
      </body>
    </html>
  );
}
