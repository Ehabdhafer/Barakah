import React, { useEffect, useState } from "react";
import axios from "axios";
import food from "../assets/food.png";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";
// import Dialog from "../assets/Dialog.svg";
import DialogTwo from "../assets/DialogTwo.svg";

const Cards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Aos.init();
  }, []);

  const BgBLUR = {
    mixBlendMode: "screen",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Example background color
    backgroundImage: `url(${DialogTwo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getdonation").then((response) => {
      setCards(response.data);
    });
  }, []);

  return (
    <div
      className=" bg-background flex flex-col items-center "
      // style={BgBLUR}
    >
      <div className="text-blue text-4xl font-semibold text-center pt-14">
        Explore What We Offer
      </div>
      <div className="bg-cover bg-center flex gap-3 px-10 pb-10  flex-wrap justify-center items-center mt-14">
        {cards
          .map((post) => (
            <div
              key={post.id}
              className="max-w-xs w-full overflow-hidden shadow-lg  card-container mt-4  "
              data-aos="zoom-in"
            >
              <img
                className="w-full h-32 object-cover"
                src={post.imageurl}
                alt="Food Image"
              />
              <div className="px-4 py-2 bg-white">
                <Link to={`/details/${post.donation_id}`}>
                  <div className="font-bold text-sm mb-1 text-blue">
                    {post.type}
                  </div>
                </Link>
                <div className="text-gray-700 text-xs flex gap-1 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  {post.city}
                </div>
                <p className="text-gray-700 text-xs mb-2">
                  Posted by: {post.username}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-700 text-xs flex justify-start">
                    {post.price} JOD
                  </p>
                  <p className="text-gray-700 text-xs flex justify-end">
                    {post.time.split()} / {post.date.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          ))
          .slice(0, 8)}
      </div>
      <Link
        data-aos="zoom-in"
        to="/donations"
        className="text-center p-3 text-white bg-blue shadow-sm font-semibold   "
      >
        {" "}
        Explore More
      </Link>
    </div>
  );
};

export default Cards;
