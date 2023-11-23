import React from "react";
import food from "../assets/food.png";

const Facts = () => {
  return (
    <div className="bg-background text-center  relative">
      <div className="bg-div absolute top-[17%] h-[13%] w-[75%] z-10 text-blue text-5xl font-bold flex justify-center items-center pl-44">
        General Facts..
      </div>
      <img src={food} alt="food" className=" p-48 w-[90%] mx-auto" />
      <div className="bg-blue w-[27%] h-[52%] absolute  left-[63%] top-[28%] text-justify text-white font-medium text-lg p-16">
        "Approximately one-third of all the food produced globally goes to
        waste. This staggering amount not only represents a significant loss of
        resources but also contributes to environmental issues, including
        greenhouse gas emissions.{" "}
        {/* <span className="block">
          By providing a platform for individuals and businesses to share
          surplus and leftover food, we can collectively work towards reducing
          this waste and building a more sustainable future."
        </span> */}
      </div>
    </div>
  );
};

export default Facts;
