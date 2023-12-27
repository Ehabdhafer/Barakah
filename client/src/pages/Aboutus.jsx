import React from "react";
import Accordion from "../components/Faq";
import aboutus from "../assets/aboutus.jpg";

const Aboutus = () => {
  return (
    <div className="bg-white">
      <div class="2xl:container bg-white 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <p class="font-medium text-lg leading-3 text-indigo-700 dark:text-indigo-500 hover:text-indigo-800 cursor-pointer pb-2">
          About Barakah
        </p>
        <div class="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
          <div class="w-full lg:w-6/12">
            <h2 class="w-full text-blue mt-4 font-bold lg:text-3xl text-3xl lg:leading-10 dark:text-white leading-9">
              We Believe in a Sustainable Future
            </h2>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
              Barakah is a platform dedicated to reducing food waste and
              nourishing communities. We connect food providers with charities
              and recycling agencies, enabling the exchange of surplus food. Our
              goal is to ensure that surplus food reaches those in need or is
              responsibly recycled into other products like compost, soap, or
              animal feed. By doing so, we create a sustainable ecosystem where
              each meal counts, making a positive impact on the environment and
              society
            </p>
          </div>
          <div class="w-full lg:w-6/12">
            <img
              class="lg:block hidden w-full"
              src={aboutus}
              alt="people discussing on board"
            />
            <img
              class="lg:hidden sm:block hidden w-full"
              src="https://i.ibb.co/16fPqrg/Rectangle-122-2.png"
              alt="people discussing on board"
            />
            <img
              class="sm:hidden block w-full"
              src={aboutus}
              alt="people discussing on board"
            />
          </div>
        </div>

        {/* <div class="sm:hidden block relative mt-8">
          <div class="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
            <img
              src={"https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg"}
              alt="user"
            />
          </div>
          <hr class="z-10 absolute top-2/4 w-full bg-gray-200" />
        </div> */}
        {/* <div class="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div>
            <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">
              Connect Food Providers
            </p>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
              Barakah links food providers with charities and recycling agencies
              to share surplus food or recycle it into useful products like
              compost or animal feed.
            </p>
          </div>
        </div> */}

        <div class="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
          <div class="w-full lg:w-6/12 mt-6">
            <h2 class="font-bold text-blue mt-3 mb-5 lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
              What We Do
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
              <div class="flex p-10 shadow-md bg-div ">
                <div class="">
                  <p class="font-semibold text-blue lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                    Empower Sustainability
                  </p>
                  <p class="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                    We empower individuals and businesses to reduce food waste
                    and its environmental impact by providing a platform for
                    easy surplus food redistribution.
                  </p>
                </div>
              </div>

              <div class="flex p-10 shadow-md bg-gray ">
                <div class="">
                  <p class="font-semibold text-blue lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                    Support Communities
                  </p>
                  <p class="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                    Barakah ensures surplus food reaches those in need,
                    fostering community support and social responsibility.
                  </p>
                </div>
              </div>

              <div class="flex p-10 shadow-md bg-background">
                <div class="">
                  <p class="font-semibold text-blue lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                    Connect Food Providers
                  </p>
                  <p class="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                    Barakah links food providers with charities and recycling
                    agencies to share surplus food or recycle it into useful
                    products like compost or animal feed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 bg-background p-8">
            <h2 class="font-bold text-blue lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6 w-full lg:w-10/12 xl:w-9/12">
              Our mission is to combat food waste by creating a platform that
              fosters the efficient redistribution of surplus food. We strive to
              connect food providers with charities and recycling agencies,
              ensuring that excess food is used to its fullest potential.
              Through this process, we aim to reduce waste, alleviate hunger,
              and promote sustainability in communities, all while empowering
              individuals and businesses to make a meaningful impact
            </p>
            <h2 class="font-bold text-blue mt-6 lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
              Our Vision
            </h2>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 w-full lg:w-10/12 xl:w-9/12 mt-6">
              Our vision is to build a world where surplus food is seen as a
              valuable resource rather than waste. We envision a
              community-driven platform that seamlessly connects those with
              excess food to those in need, creating a sustainable cycle of food
              sharing and reducing environmental impact. Through our efforts, we
              aim to inspire a global shift towards responsible consumption,
              where every meal contributes to a better future for both people
              and the planet.
            </p>
          </div>
        </div>
      </div>

      <Accordion />
    </div>
  );
};

export default Aboutus;
