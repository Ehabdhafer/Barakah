import React from "react";
import food from "../assets/food.png";
import card from "../assets/card.png";
import posts from "../assets/posts.png";
import postForm from "../assets/postform.png";
import request from "../assets/requestForm.png";
import details from "../assets/details.png";

const Facts = () => {
  return (
    <div className="bg-background  w-[50%] ">
      <div class="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
        <div>
          <img src={details} alt="" loading="lazy" />
        </div>
        <div class="col-start-3">
          <img src={request} alt="" loading="lazy" />
        </div>
        <div>
          <img src={postForm} alt="" loading="lazy" />
        </div>
        <div>
          <img src={card} alt="" loading="lazy" />
        </div>
        <div class="row-start-1 col-start-2 col-span-2">
          <img src={posts} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Facts;
