"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type ColorProps = {};

const Theme: React.FC<ColorProps> = () => {
  const [open, setOpen] = useState(true);
  const colors: { id: number; name: string; count: number }[] = [
    {
      id: 1,
      name: "Animals",
      count: 558,
    },
    { id: 2, name: "Abstract", count: 486 },
    { id: 3, name: "Flowers", count: 383 },
    {
      id: 4,
      name: "People",
      count: 344,
    },
    { id: 5, name: "Trees", count: 312 },
    { id: 6, name: "Gallery Sets", count: 300 },
    { id: 7, name: "Scenic And Landscapes", count: 580 },
    { id: 8, name: "Marble", count: 350 },
    { id: 9, name: "Music And Dance", count: 299 },
    { id: 10, name: "Cities", count: 250 },
    { id: 11, name: "Seascapes And Beaches", count: 200 },
  ];
  return (
    <div className="pt-[15px]">
      <h1
        onClick={() => setOpen(!open)}
        className="cursor-pointer uppercase  font-semibold flex items-center gap-2 text-[#3a3a3a] -ml-[2px]"
      >
        <span className="text-xl">
          {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
        <span className="text-sm">THEME</span>
      </h1>
      <div
        className={`transition-all ease-linear duration-300   overflow-y-auto scroll  ${
          open ? "h-[10rem] visible opacity-100" : "h-0 invisible opacity-100"
        }`}
      >
        <div className="flex flex-col ">
          {colors.map((theme) => (
            <button key={theme.id} className="py-[6px] text-left">
              <p className="flex items-center gap-2 justify-between pr-4">
                <label
                  htmlFor={`${theme.id}`}
                  className="flex gap-2 items-center"
                >
                  <input type="checkbox" id={`${theme.id}`} />
                  <span>{theme.name}</span>
                </label>
                <span>({theme.count})</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Theme;
