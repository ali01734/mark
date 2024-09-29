"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type ColorProps = {};

const Shape: React.FC<ColorProps> = () => {
  const [open, setOpen] = useState(true);
  const colors: { id: number; name: string; count: number }[] = [
    {
      id: 1,
      name: "landscape",
      count: 1242,
    },
    { id: 2, name: "portrait", count: 584 },
    { id: 3, name: "square", count: 382 },
    {
      id: 4,
      name: "three panel",
      count: 191,
    },
    { id: 5, name: "two panel", count: 43 },
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
        <span className="text-sm">SHAPE</span>
      </h1>
      <div
        className={`transition-all ease-linear duration-300  overflow-y-auto scroll ${
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
export default Shape;
