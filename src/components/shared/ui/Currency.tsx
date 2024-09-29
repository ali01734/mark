"use client"; // Client-side component

import { useEffect } from "react";

interface CurrencyProps {
  onCurrencyLoaded: () => void; // Declare the type for the onCurrencyLoaded prop
}

export default function Currency({ onCurrencyLoaded }: CurrencyProps) {
  useEffect(() => {
    const currencySession = localStorage.getItem("currencySession");

    if (!currencySession || currencySession === "{}") {
      console.log("currencySession not found, calling API...");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/get-currency`)
        .then((response) => response.json())
        .then((data) => {
          const currencyData = JSON.stringify({
            countryCode: data.data.countryCode,
            currencySym: data.data.currencySym,
            currencyValue: data.data.currencyValue,
            countryId: data.data.countryId,
          });

          localStorage.setItem("currencySession", currencyData);
          onCurrencyLoaded();
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      onCurrencyLoaded();
      console.log("already done")
    }
  }, [onCurrencyLoaded]); // Add onCurrencyLoaded to the dependency array

  // No need to render anything in this component
  return null;
}
