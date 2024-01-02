import React from "react";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import Facts from "../components/Facts";
import Cards from "../components/Cards";
import Partners from "../components/Partners";

const Home = () => {
  return (
    <div className="bg-background ">
      <Hero />
      <WhatWeDo />
      <Cards />
      {/* <Facts /> */}
      <div className="h-20"></div>
      <Partners />
    </div>
  );
};

export default Home;
