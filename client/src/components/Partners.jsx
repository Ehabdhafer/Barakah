import React from "react";
import partner from "../assets/partner.png";

const Partners = () => {
  return (
    <div className="bg-blue h-screen w-full relative ">
      <div className="text-white text-4xl font-semibold text-center pt-20">
        Our Partners
      </div>
      <div className="bg-gray h-[23%] absolute top-40 flex justify-around w-full">
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
      </div>
      <div className="text-white text-4xl font-semibold text-center pt-60">
        Testimonial
      </div>
      <div className="absolute top-[70%] w-full h-[60%] flex  ">
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
