import React from "react";
import traingle from "../assets/triangles.png";
import square from "../assets/div.png";
import Logo from "../assets/logo.png";
import "animate.css/animate.min.css";
import ExploreButton from "./ExploreButton";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-background w-screen h-screen relative ">
      <div className="flex flex-row justify-items-start pt-10 gap-0">
        <img
          className="w-[900px] h-[850px] absolute  -top-52 -left-20 "
          src={traingle}
          alt="Logo"
        />
        <img
          src={Logo}
          alt="Logo"
          className="h-32 absolute left-64 top-32  animate__animated animate__slideInLeft"
        />
        <div className="">
          <img
            className="w-[60%] h-[500px] absolute right-0 animate__animated animate__slideInRight "
            src={square}
            alt="Intro"
          />
          <div className="left-[60%] top-[22%]  absolute text-md text-white font-medium w-[33%] text-justify-between animate__animated animate__slideInRight">
            <div className="text-2xl font-bold mb-2">
              {" "}
              Welcome to BARAKAH, where we're dedicated to reducing food waste.
            </div>
            Our platform empowers people and businesses to share surplus and
            leftover food, fostering a community committed to sustainability.
            <div className=" font-bold mt-2">
              Join us in making each meal count!
            </div>
            <div className="text-center mt-6">
              {/* <button class="bg-transparent border border-white text-white py-2 px-4 shadow text-md font-semibold hover:bg-white hover:text-blue">
                Sign Up
              </button>{" "} */}

              <ExploreButton />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Hero;
