import React from "react";

type TitleProps = {
  title: string;
  className?: string;
  wClass?: string;
};

const Title: React.FC<TitleProps> = ({ title, className, wClass }) => {
  return (
    <div className="relative ">
      <div className="absolute inset-0 m-auto w-1/2 h-1/2 flex items-center justify-center z-0">
        <div
          className={`w-full h-[2px] bg-black ${
            wClass ? wClass : "max-w-[450px]"
          }`}
        ></div>
      </div>
      <div className="flex justify-center">
        <h3
          className={`capitalize inline-block text-2xl text-black font-medium text-center relative z-10 ${
            className ? className : " bg-[#F2F2F2]"
          } px-5 `}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};
export default Title;
