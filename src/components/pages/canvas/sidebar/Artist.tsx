"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type ColorProps = {};

const Artist: React.FC<ColorProps> = () => {
  const [open, setOpen] = useState(true);
  const colors: { id: number; name: string; count: number }[] = [
    {
      id: 1,
      name: "Ashvin Harrison",
      count: 290,
    },
    {
      id: 2,
      name: "Aimee Linzi",
      count: 27,
    },
    {
      id: 3,
      name: "banksy",
      count: 18,
    },
    {
      id: 4,
      name: "Carol Robinson",
      count: 51,
    },
    {
      id: 5,
      name: "Dawn Underwood",
      count: 7,
    },
    {
      id: 6,
      name: "DB Waterman",
      count: 18,
    },
    {
      id: 7,
      name: "Denise Dundon",
      count: 18,
    },
    {
      id: 8,
      name: "Ekaterina Ermilkina",
      count: 131,
    },
    {
      id: 9,
      name: "Elena Avanesova",
      count: 21,
    },
    {
      id: 10,
      name: "Emma LC Art",
      count: 40,
    },
    {
      id: 11,
      name: "Finbar Stevens",
      count: 8,
    },
    {
      id: 12,
      name: "Isabella Karolewicz",
      count: 25,
    },
    {
      id: 13,
      name: "James Parker",
      count: 16,
    },
    {
      id: 14,
      name: "Jane Brookshaw",
      count: 24,
    },
    {
      id: 15,
      name: "laure bury",
      count: 31,
    },
    {
      id: 16,
      name: "Leon Devenice",
      count: 157,
    },
    {
      id: 17,
      name: "Liz Pangrazi Art",
      count: 13,
    },
    {
      id: 18,
      name: "Nada Khatib",
      count: 53,
    },
    {
      id: 19,
      name: "Olga Tkachyk",
      count: 153,
    },
    {
      id: 20,
      name: "Osnat Tzadok",
      count: 52,
    },
    {
      id: 21,
      name: "Roberto Moro",
      count: 42,
    },
    {
      id: 22,
      name: "Sarah Manovski",
      count: 102,
    },
    {
      id: 23,
      name: "Scarlet Sky Studio",
      count: 44,
    },
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
        <span className="text-sm">Artist</span>
      </h1>
      <div
        className={`transition-all ease-linear duration-300   overflow-y-auto scroll ${
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
export default Artist;
