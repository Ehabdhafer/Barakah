import React, { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import foodDon1 from "../assets/food-donation-64.png";
import foodDon2 from "../assets/food-donation-78.png";
import partner from "../assets/partnership-50.png";

const WhatWeDo = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="bg-background " id="whatWeDoSection">
      <div className="w-[85%] bg-div h-screen relative ">
        <div className="text-blue font-bold text-3xl absolute mt-28 left-[24%] text-center ">
          WHAT WE DO?{" "}
          <span className="block text-[15px] mt-4 ">
            {" "}
            Here's how we're making a difference
          </span>
        </div>
        <div
          className="w-[38%] bg-gray h-[32%] absolute mt-16 left-[50%] text-white p-12 text-lg font-medium text-center shadow-lg"
          data-aos="fade-right"
        >
          <span className="">
            {/* <img className="w-14 inline pr-2" src={foodDon1} alt="" /> */}
            Foods Sharing Platform{" "}
          </span>
          <span className="block text-lg mt-3">
            we provide a space for people to share their surplus and leftover
            foods effortlessly.{" "}
          </span>
        </div>
        <div
          className="w-[38%] bg-blue h-[32%] absolute mt-16 left-[50%] top-80 text-white p-12 text-lg font-medium text-center shadow-lg"
          data-aos="fade-right"
        >
          {" "}
          Business Partnerships
          <span className="block text-lg mt-3">
            Through our platform, these businesses can efficiently sell their
            surplus products at discounted prices.
          </span>
        </div>
        <div
          className="w-[38%] bg-orange h-[32%] absolute mt-16 left-[20%] top-40 text-white p-10 text-lg font-medium text-center shadow-lg"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          Charitable Initiatives{" "}
          <span className="block text-lg mt-1">
            {" "}
            Charities using our platform gain access to a comprehensive database
            of surplus food, allowing them to efficiently find resources to aid
            those in need
          </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default WhatWeDo;
