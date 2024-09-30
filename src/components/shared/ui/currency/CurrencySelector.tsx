"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
interface CurrencySessionData {
    countryCode?: string;
    currencySym?: string; 
    currencyValue?: number; 
    countryId?: number; 
  }
  const CurrencySelector: React.FC = () => {
    const [allCurrency, setAllCurrency] = useState<any[]>([]); // To store all currency data
    const [error, setError] = useState<string | null>(null);
    const [curSession, setCurSession] = useState<CurrencySessionData>({});
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const router = useRouter();
  
    // Fetch currencies and session on mount
    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/get-all-currency`);
          if (!response.ok) throw new Error('Network response was not ok');
  
          const data = await response.json();
          setAllCurrency(data.data); // Assuming data has the 'data' field containing currencies
  
          // Load the current session currency from localStorage
          const currencySession = JSON.parse(localStorage.getItem("currencySession") || "{}");
          if (currencySession) {
            setCurSession(currencySession);
            setSelectedCurrency(currencySession.currencySym || "");
          }
        } catch (error) {
          setError('Failed to fetch currency data');
          console.error(error);
        }
      };
  
      fetchCurrencies();
    }, []);
  
    // Handle currency change and update the session and backend
    const handleCurrencyChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newCurrency = event.target.value;
  
      try {
        setSelectedCurrency(newCurrency); // Update the local state immediately
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/set-default-currency`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country_code: newCurrency }),
        });
  
        if (!response.ok) throw new Error('Failed to update currency');
  
        const data = await response.json();
        const currencySession = {
          countryCode: data.data.countryCode,
          currencySym: data.data.currencySym,
          currencyValue: data.data.currencyValue,
          countryId: data.data.countryId,
        };
  
        localStorage.setItem("currencySession", JSON.stringify(currencySession));
        setCurSession(currencySession); // Update local state with the new session
        console.log("New value =", currencySession.currencySym);
  
        router.refresh(); // Refresh the page to apply changes
        console.log("Page refreshed");
      } catch (error) {
        console.error('Error updating currency:', error);
      }
    };
  
    return (
      <div className="form-group currencyBtn mt-5 text-right">
        <select
          id="allcurency"
          className="w-full bg-green-600 text-white p-2 rounded-md appearance-none border-none focus:outline-none focus:ring-0 max-w-[40%] text-center"
          name="allcurency"
          onChange={handleCurrencyChange}
          value={selectedCurrency} // Bind the selected currency
        >
          {allCurrency.map((currency, index) => (
            <option key={index} value={currency.currency_symbol}>
              {currency.currency_symbol}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      </div>
    );
  };

export default CurrencySelector;
