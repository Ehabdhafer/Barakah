import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const FeedbackFormModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please check the checkbox to confirm before submitting.",
      });
      return;
    }
    try {
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = token;

      const formData = {
        message,
      };

      // Make a POST request to your server endpoint with Axios
      const response = await axios.post(
        "http://localhost:5000/postfeedback",
        formData
      );

      // Show a success sweet alert after successful submission
      Swal.fire({
        icon: "success",
        title: "Feedback Submitted!",
        text: "Your feedback has been submitted successfully.",
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Feedback form submission error:", error);

      // Show an error sweet alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the feedback form. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Feedback input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Share your experience
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter your feedback here"
              rows={4}
            />
          </div>

          {/* Show on website checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              className="mr-2"
              required
            />
            <label className="text-sm font-medium text-gray-600">
              I agree to show my feedback on the website
            </label>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue text-white py-2 px-4 ">
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

export default FeedbackFormModal;
