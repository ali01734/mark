import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chat from "@/components/shared/ui/chat/Chat";
import CurrencyBlocker from "@/components/shared/ui/CurrencyBlocker";


const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap", // Add display swap for better font loading
});

export const metadata: Metadata = {
  title: "Mark Drawing",
  description: "Mark Drawing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <CurrencyBlocker>
            <Chat>{children}</Chat> {/* Chat will only render when currency is loaded */}
        </CurrencyBlocker>
      </body>
    </html>
  );
}
