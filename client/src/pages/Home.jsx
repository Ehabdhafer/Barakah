import React from "react";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import Facts from "../components/Facts";
import Cards from "../components/Cards";
import Partners from "../components/Partners";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhatWeDo />
      <Facts />
      <Cards />
      <Partners />
    </div>
  );
};

export default Home;
