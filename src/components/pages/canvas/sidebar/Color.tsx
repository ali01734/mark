"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type ColorProps = {};

const Color: React.FC<ColorProps> = () => {
  const [open, setOpen] = useState(true);
  const colors: { id: number; name: string; color: string }[] = [
    {
      id: 1,
      name: "Multicolored",
      color: "bg-gradient-to-r from-yellow-400 via-red-700 to-pink-700",
    },
    { id: 2, name: "Blue", color: "bg-blue-700" },
    { id: 3, name: "Black", color: "bg-black" },
    {
      id: 4,
      name: "Black and White",
      color: "bg-gradient-to-r from-black via-white to-black",
    },
    { id: 5, name: "Grey", color: "bg-gray-700" },
    { id: 6, name: "Green", color: "bg-green-700" },
    { id: 7, name: "Red", color: "bg-red-700" },
    { id: 8, name: "Yellow", color: "bg-yellow-700" },
    { id: 9, name: "Purple", color: "bg-purple-700" },
    { id: 10, name: "Pink", color: "bg-pink-700" },
    { id: 11, name: "Orange", color: "bg-orange-700" },
  ];
  return (
    <div className="">
      <h1
        onClick={() => setOpen(!open)}
        className="cursor-pointer uppercase  font-semibold flex items-center gap-2 text-[#3a3a3a] -ml-[2px]"
      >
        <span className="text-xl">
          {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
        <span className="text-sm">color</span>
      </h1>
      <div
        className={`transition-all ease-linear duration-300   overflow-y-auto scroll ${
          open ? "h-[10rem] visible opacity-100" : "h-0 invisible opacity-100"
        }`}
      >
        <div className="flex flex-col ">
          {colors.map((color) => (
            <button key={color.id} className="py-[6px] text-left">
              <p className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full ${color.color} inline-block border-[2px] border-transparent hover:border-black`}
                ></span>
                <span>{color.name}</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Color;
