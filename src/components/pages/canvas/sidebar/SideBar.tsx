"use client";
import { useSpring, animated } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import Color from "./Color";
import Theme from "./Theme";
import Shape from "./Shape";
import Artist from "./Artist";

type SideBarProps = {};

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="w-full">
      {/* <Color />
      <div className="pt-[15px]  border-b border-b-[#e3e3e3] "></div> */}
      <Theme />
      <div className="pt-[15px]  border-b border-b-[#e3e3e3] "></div>
      {/* <Shape />
      <div className="pt-[15px]  border-b border-b-[#e3e3e3] "></div>
      <Artist /> */}
    </div>
  );
};
export default SideBar;
