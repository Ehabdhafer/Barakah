import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import food from "../assets/food.png";
import RequestForm from "../components/RequestForm";

const Details = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // Fetch post details based on the id from the URL params
    axios
      .get(`http://localhost:5000/donation/${id}`)
      .then((response) => {
        setPostDetails(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        // Handle error, e.g., show an alert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error fetching post details.",
        });
      });
  }, [id]);

  const openRequestForm = () => {
    setIsRequestFormOpen(true);
  };

  const closeRequestForm = () => {
    setIsRequestFormOpen(false);
  };

  const handleRequestFood = () => {
    // Add logic to handle the food request
    // You can send the request details to the server or perform any other action
    // Open the modal after handling the request
  };

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background pt-28 relative pb-24">
      <div className="max-w-[50%] mx-auto bg-white overflow-hidden shadow-lg">
        <img
          src={food}
          alt="Food"
          className="w-[35%] mx-auto h-64 object-cover absolute top-16 left-96 ml-12"
        />

        <div className="p-24 pt-60">
          <div className="flex items-center mb-2 t">
            <div className="text-2xl font-bold mr-6 text-blue ">
              {postDetails.type}
            </div>
            {/* <span className="ml-4 text-blue">{postDetails.postedTime}</span> */}
          </div>

          <div className="mb-1 text-blue font-medium">
            <span className="font-bold">Posted by:</span> {postDetails.username}
          </div>
          <div className="mb-4 text-blue font-medium flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {postDetails.city}
          </div>

          <div className="flex items-center gap-20 text-blue mb-4">
            <div className="mb-4 flex flex-col">
              <span className="font-bold">Quantity:</span>{" "}
              {postDetails.qty}
            </div>
            <div className="mb-4 flex flex-col">
              <span className="font-bold">Expiry Date:</span>{" "}
              {postDetails.expired ? "Expired" : postDetails.expiry_date}
            </div>
            <div className="mb-4 flex flex-col">
              <span className="font-bold">Price:</span>{" "}
              {postDetails.free ? "Free" : postDetails.price}
            </div>
          </div>
          <div className="mb-4 text-blue flex ">
            <span className="text-blue font-bold block pr-4">Details:</span>{" "}
            {postDetails.details}
          </div>

          <div className="mb-10 text-blue">
            <span className="text-blue font-bold block">Additional Notes:</span>{" "}
            {postDetails.additionalnotes}
          </div>

          <div className="flex">
            <button
              className="bg-orange text-white font-semibold py-2 px-4 hover:bg-blue hover:text-white transition duration-300"
              onClick={openRequestForm}
            >
              Request Food
            </button>{" "}
          </div>
        </div>
      </div>
      <RequestForm isOpen={isRequestFormOpen} onClose={closeRequestForm} />
    </div>
  );
};

export default Details;
