"use client"; // Client-side component

import { useState } from "react";
import Currency from "@/components/shared/ui/Currency";
import { ReactNode } from "react"; // Import ReactNode type
import Loading from "@/app/loading";

interface CurrencyBlockerProps {
  children: ReactNode; // Type the children prop as ReactNode
}

export default function CurrencyBlocker({ children }: CurrencyBlockerProps) {
  const [isCurrencyLoaded, setIsCurrencyLoaded] = useState(false);

  const handleCurrencyLoadComplete = () => {
    setIsCurrencyLoaded(true); // Mark currency as loaded
  };

  return (
    <>
      <Currency onCurrencyLoaded={handleCurrencyLoadComplete} />
      {isCurrencyLoaded ? children : <Loading />}
    </>
  );
}
