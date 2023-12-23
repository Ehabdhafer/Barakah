import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie"


const AcceptForm = ({ isOpen, onClose, orderId }) => {
  const [accept_location, setCollectionLocation] = useState("");
  const [collectionTime, setCollectionTime] = useState("");
  const [phone, setContactNumber] = useState("");
  const [isNotificationChecked, setIsNotificationChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the checkbox is checked
    if (!isNotificationChecked) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please check the notification checkbox before submitting the form.",
      });
      return;
    }

    try {
      // Prepare the data object with collection location, collection time, contact number, and notification checkbox
      const formData = {
        accept_location,
        collectionTime,
        phone,
        order_id:orderId,

        // Add other form fields as needed
      };
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = token;

      // Make a POST request to your server endpoint with Axios
      const response = await axios.post(
        "http://localhost:5000/postconfirm",
        formData
      );
// console.log(formData);
      // Show a success sweet alert after successful submission
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your request has been submitted successfully.",
      });

      // Close the modal after successful submission
      onClose();
      window.location.reload();

    } catch (error) {
      // Handle errors
      console.error("Request form submission error:", error);

      // Show an error sweet alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the request form. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {/* Modal content goes here */}
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Accept Form</h2>
        {/* Your form inputs go here */}
        <form onSubmit={handleSubmit}>
          {/* Collection location input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Collection Location
            </label>
            <input
              type="text"
              value={accept_location}
              onChange={(e) => setCollectionLocation(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="City, Street"
            />
          </div>

          {/* Collection time input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Collection Time
            </label>
            <input
              type="datetime-local"
              value={collectionTime}
              onChange={(e) => setCollectionTime(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter collection time"
            />
          </div>

          {/* Contact number input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setContactNumber(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter contact number"
            />
          </div>

          {/* Notification checkbox */}
          <div className="mb-4 flex gap-3">
            <input
              type="checkbox"
              checked={isNotificationChecked}
              onChange={() => setIsNotificationChecked(!isNotificationChecked)}
              className="mt-1 p-2"
              required
            />
            <label className="block text-sm font-medium text-gray-600">
              Once you Accept, it will be automatically out for delivery.
            </label>
          </div>

          {/* Add more input fields with similar structure if needed */}

          <div className="flex justify-between">
            <button type="submit" className="bg-blue text-white py-2 px-4">
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-blue hover:underline"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AcceptForm;
