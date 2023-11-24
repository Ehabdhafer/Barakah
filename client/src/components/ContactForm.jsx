import React from "react";

const ContactForm = () => {
  return (
    <div className="relative ">
      <div className=" w-[17rem] bg-blue h-[44rem] mt-16 shadow-md -z-10 ">
        {/* <h1 className="absolute top-[55%] left-[65%] text-4xl text-white font-bold">
          CONTACT US
        </h1>
        <p className="absolute top-[73%] left-[65%] text-sm text-white font-medium">
          Join the change we make
        </p> */}
      </div>
      {/* <div className="absolute w-[30%] h-11 bg-div mt-36 "></div> */}
      {/* <div className="bg-blue w-[30%] absolute h-[20%] bottom-12 right-[10%]"></div> */}
      <div className="bg-background p-40 ">
        <div className="max-w-2xl mx-auto absolute top-40 p-28 bg-white shadow-lg text-blue pt-20 ">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-bold">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-bold">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-bold">
                  Phone:
                </label>
                <input
                  type="number"
                  name="phone"
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-bold">
                Message:
              </label>
              <textarea
                name="message"
                className="w-full h-32 p-2 mt-1 border"
              ></textarea>
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-orange text-white py-2 px-20 shadow-md text-md font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
