import React, { useEffect, useState } from "react";
import axios from "axios";
import food from "../assets/food.png";

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getdonation").then((response) => {
      setCards(response.data);
    });
  }, []);

  return (
    <div className="bg-cover bg-center bg-background flex gap-3 px-10 pb-20 flex-wrap justify-center">
      {cards
        .map((card) => (
          <div
            key={card.donation_id}
            className="max-w-sm w-[350px] overflow-hidden shadow-lg"
          >
            <img className="w-full" src={food} alt="Food Image" />
            <div className="px-6 py-4 bg-white h-40">
              <div className="font-bold text-xl mb-2 text-blue">
                {card.type}
              </div>
              <div className="text-gray-700 text-base inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 inline-block"
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
                <p className="ml-2 inline-block">{card.city}</p>
              </div>
              <p className="text-gray-700 text-base mb-4">
                Posted by: {card.username}
              </p>
              <p className="text-gray-700 text-base flex justify-end">
                {card.time}
              </p>
            </div>
          </div>
        ))
        .slice(0, 3)}
    </div>
  );
};

export default Cards;
