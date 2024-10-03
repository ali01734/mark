import React from "react";
import bg from "@/assets/protraits/banner.jpg";
import Image from "next/image";


type BannerProps = {
    text: string;
};

const Banner: React.FC<BannerProps> = ({ text }) => {
    return (
        <>
        <section className="relative h-[80px] lg:h-[100px]">
            <div className="container mx-auto px-5 sm:px-0 h-full">
                <div className="relative h-full">
                    {/* Image is hidden on md and below, visible only on lg */}
                    <Image
                        src={bg}
                        alt="banner"
                        className="object-cover hidden lg:block" // Visible only on lg screens
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col justify-center">
                        <div className="flex justify-between items-center gap-5 text-[10px] md:text-xs lg:text-3xl">
                            {/* Hide h1 on md and below, visible only on lg */}
                            <h1 className="italic font-bold text-[#69727b] hidden lg:block">Markdrawing</h1>

                            {/* Text section, full width on md and green background */}
                            <div className="w-full lg:w-1/2 lg:ml-24 ml-0 flex justify-center bg-[#2BB673]
                                lg:bg-transparent h-[80px] lg:h-auto items-center lg:items-start">
                            <p className="text-white text-lg capitalize w-full md:w-auto text-center">{text}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</>

)
    ;
};

export default Banner;
