import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import paper from "../assets/paper-airplane.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to your server or API endpoint using Axios
      await axios.post("http://localhost:5000/postcontact", formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your message has been sent successfully!",
      });

      // You can add additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      // Handle errors, you might want to show an error message to the user
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="bg-background flex justify-center contact-form-container  ">
      <div className=" p-64 form-container mt-16">
        <div className="max-w-2xl mx-auto  p-24 bg-white shadow-lg text-blue relative z-20 pt-14  ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Subject" className="block text-sm font-bold">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                onChange={handleChange}
                className="block w-full p-2 mt-1 border h-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-bold">
                  Phone:
                </label>
                <input
                  type="number"
                  name="phone"
                  className="block w-full p-2 mt-1 border h-10"
                />
              </div> */}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
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
                onChange={handleChange}
                className="w-full h-32 p-2 mt-1 border"
              ></textarea>
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue text-white py-2 px-20 shadow-md text-md font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-blue w-[58%] h-[60%] absolute z-0 top-24 text-center font-semibold text-white text-xl pt-14 fade-in mt-10">
        <span className="text-3xl block pb-2">
          Let's Connect! <img src={paper} alt="" className="inline w-20" />
        </span>
        Have a question, suggestion, or just want to chat?{" "}
        <span className="block font-normal text-lg px-20 ">
          Drop us a message below! Your thoughts matter as we work together to
          reduce food waste and make a meaningful impact. Reach out now!
        </span>
        {/* <div className="flex justify-center mt-4 font-medium">
          <div className="flex items-center mr-6">
            <div className="h-6 w-6 text-lg text-white" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="ml-2 text-white text-[18px]">123-456-7890</span>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 text-lg text-white" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="ml-2 text-[18px] text-white">
              Queen Zain Street, Az Zarqa
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactForm;
