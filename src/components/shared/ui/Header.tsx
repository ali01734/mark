"use client";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import facebook from "@/assets/shared/facebook.png";
import whatsapp from "@/assets/shared/whatsapp.png";
import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Header: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const pathname = usePathname(); // Track current pathname
  const router = useRouter();

  // Function to check login status
  const checkLoginStatus = () => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = (): CartItem[] => {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
      return [];
    };

    setCartItems(loadCartItems());
    checkLoginStatus();
  }, []);

  // Listen for changes in localStorage to update login status dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Use the pathname to detect route changes
  useEffect(() => {
    checkLoginStatus();
  }, [pathname]); // Re-run checkLoginStatus when the pathname changes

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(""); // Clear username on logout
    setShowLogout(false);
    router.push(`/`); // Redirect to homepage
  };

  const navLinks = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Portraits", link: "/portraits" },
    { id: 3, title: "Oil Point", link: "/oil-point" },
    { id: 4, title: "Family Portrait", link: "/family-portrait/118?q=1" },
    { id: 9, title: "Canvas", link: "/canvas" },
    { id: 5, title: "Reviews", link: "/reviews" },
    { id: 6, title: "FAQ", link: "/faq" },
    { id: 7, title: "Contact", link: "/contact" },
    { id: 8, title: "Track your Order", link: "/track-your-order" },
  ];

  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      {/* Header Top */}
      <div className="bg-[#ebebeb] py-3">
        <div className="container mx-auto px-5">
          <div className="flex justify-between flex-wrap">
            <div className="flex gap-3">
              <div>
                <span className="text-[#212529] text-[15px]">Follow us on:</span>
              </div>
              <ul className="flex gap-3">
                <li>
                  <Link href={"https://www.facebook.com/Markdrawing"}>
                    <Image width={40} height={30} src={facebook} alt="facebook icon" />
                  </Link>
                </li>
                <li>
                  <Link href={"https://wa.me/message/AM27T7SLL7TOG1"}>
                    <Image width={40} height={30} src={whatsapp} alt="whatsapp icon" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-[15px] text-[#212529] font-medium flex gap-3">
                {isLoggedIn ? (
                  <>
                    <li className="border-r border-r-[#212529] pr-2">
                      <Link href="/user/my-account">My Account</Link>
                    </li>
                    <li className="border-r border-r-[#212529] pr-2">
                      <span
                        className="cursor-pointer"
                        onClick={() => setShowLogout(!showLogout)}
                      >
                        {username}
                      </span>
                      {showLogout && (
                        <div className="absolute mt-2 bg-white border rounded shadow-lg p-2">
                          <button className="text-red-500" onClick={handleLogout}>
                            Logout
                          </button>
                        </div>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li className="border-r border-r-[#212529] pr-2">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="border-r border-r-[#212529] pr-2">
                      <Link href={"/register"}>Register</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link className="relative" href={"/carts"}>
                    Cart
                    <span
                      className={`${
                        quantity
                          ? "absolute -right-3 -top-1 w-[5px] h-[5px] bg-[#00C44E] rounded-full flex items-center justify-center p-2 text-xs text-white"
                          : "hidden"
                      }`}
                    >
                      {cartItems.length ? quantity : null}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header Bottom */}
      <div className="header__bg">
        <div className="container py-2 relative">
          <div className="lg:flex items-center gap-5">
            <div>
              <Link href={"/"}>
                <Image src={logo} alt="logo" width={208} height={73} />
              </Link>
            </div>
            <div>
              {/* Menu */}
              <div>
                <div className="block lg:hidden w-full absolute right-4 top-5">
                  <div className="flex justify-end">
                    <button
                      aria-label="Menu"
                      onClick={() => setShowMenu(!showMenu)}
                      className="px-3 py-1 header__mobile_menu border rounded-[.25rem]"
                    >
                      <MdMenu size={30} />
                    </button>
                  </div>
                </div>
                {!showMenu && (
                  <div className="lg:block hidden">
                    <nav className="flex lg:flex-row gap-1">
                      {navLinks.map((navLink) => (
                        <Link key={navLink.id} href={navLink.link}>
                          <span
                            className={`text-[#00000080] font-bold text-[15px] hover:text-[#fff] px-[10px] py-1 rounded-[5px] hover:bg-[#3db573] ${
                              pathname === navLink.link && "bg-[#3db573] text-[#fff]"
                            }`}
                          >
                            {navLink.title}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Menu */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                showMenu ? " opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden lg:hidden w-full pt-2`}
            >
              <div className="w-full h-full">
                <nav className="flex flex-col">
                  {navLinks.map((navLink) => (
                    <Link className="w-full" key={navLink.id} href={navLink.link}>
                      <span
                        className={`text-[#00000080] block font-bold text-[15px] hover:text-[#fff] px-[10px] py-1 rounded-[5px] hover:bg-[#3db573] ${
                          pathname === navLink.link && "bg-[#3db573] text-[#fff]"
                        }`}
                      >
                        {navLink.title}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
