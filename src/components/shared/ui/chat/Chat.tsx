"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSmile, FaWhatsapp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdChatBubble } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';

type ChatProps = {
  children?: React.ReactNode;
};

const Chat: React.FC<ChatProps> = ({ children }) => {
  
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      {children}
      <div className="fixed bottom-[61px] right-0 z-[999] pr-5 hidden md:block">
        <button className="bg-[#2cb674] rounded-md font-semibold px-[20px] py-[10px] text-white flex items-center gap-5 mb-10 ml-auto">
          <FaWhatsapp className="text-white text-5xl" />
          24/7 Support
        </button>{" "}
        <div className="flex items-center gap-5">
          <button
            style={{
              boxShadow: "rgba(0, 18, 46, 0.18) 0px 2px 20px 0px",
            }}
            onClick={() => setShowChat(!showChat)}
            className="bg-white rounded-2xl text-lg   font-semibold px-[15px] py-[10px] "
          >
            24/7 Live Chat Support
          </button>
          <div>
            <button
              style={{
                boxShadow: "rgba(41, 50, 60, 0.5) 0px 2px 16px",
                background:
                  "linear-gradient(135deg, rgb(41, 50, 60), rgb(72, 85, 99))",
              }}
              onClick={() => setShowChat(!showChat)}
              className="w-[60px] h-[60px] rounded-[28px] flex items-center justify-center relative z-[99999]"
              aria-label="Toggle chat" // Added aria-label for accessibility
            >
              <MdChatBubble className="text-white text-2xl" />
            </button>
          </div>
        </div>
        <CurrencySelector />
      </div>
      {showChat && <ChatUi showChat={showChat} setShowChat={setShowChat} />}
    </div>
  );
};
export default Chat;

const ChatUi = ({
  setShowChat,
  showChat,
}: {
  setShowChat: (showChat: boolean) => void;
  showChat: boolean;
}) => {
  return (
    <>
      <div
        className={`fixed bottom-4 right-4 z-[9999] ${
          showChat ? "w-80" : "w-16"
        } transition-all duration-300`}
      >
        <div
          className={`bg-gradient-to-r from-gray-800 to-gray-600 text-white p-4 rounded-lg shadow-lg ${
            showChat ? "h-96" : "h-16"
          } flex flex-col`}
        >
          {showChat ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  Hi there
                  <Image
                    width={24}
                    height={24}
                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png"
                    alt="👋"
                    className="w-6 h-6 ml-2"
                  />
                </h2>
                <div>
                  <button
                    className="text-white"
                    onClick={() => setShowChat(false)}
                    aria-label="Minimize"
                  >
                    <AiOutlineClose size={24} />
                  </button>
                  <button className="text-white" aria-label="Open options">
                    <RiSettings2Line size={24} />
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mb-4 ">
                  Welcome to our website. Ask us anything
                  <Image
                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f389.png"
                    alt="🎉"
                    width={24}
                    height={24}
                    className="w-6 h-6 ml-2"
                  />
                </p>
                <div className="flex flex-col mb-4">
                  <div className="flex items-center mb-2">
                    <div
                      className="w-12 h-12 bg-cover rounded-full"
                      style={{
                        backgroundImage:
                          "url(https://avatars.tidiochat.com/ka5x3sug2c3nmp9t1txzbp8mun4omphy/avatars/93a469d4-dfd8-48a1-a9f2-eff98e9b8351.png)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-center p-2 rounded-lg">
                  We are available 24/7
                </div>
              </div>
              <div className="flex flex-col mt-auto">
                <textarea
                  className="w-full p-2 rounded-lg border border-gray-300 mb-2"
                  rows={2}
                  placeholder="Enter your message..."
                  aria-label="New message"
                ></textarea>
                <div className="flex justify-between items-center">
                  <button
                    className="text-[#2BB673]"
                    aria-label="Open Emoji picker"
                  >
                    <FaRegSmile size={24} />
                  </button>
                  <button className="bg-[#2BB673] mt-5 text-white px-4 py-2 rounded-lg">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              className="bg-gradient-to-r from-gray-800 to-gray-600 p-4 rounded-full flex items-center justify-center shadow-lg"
              onClick={() => setShowChat(true)}
              aria-label="Open chat widget"
            >
              <IoMdArrowDropdown size={24} color="white" /> 
            </button>
          )}
        </div>
      </div>
    </>
  );
};



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