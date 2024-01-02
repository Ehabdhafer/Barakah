// PostFormModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const PostForm = ({ showModal, onClose }) => {
  const [type, setFoodType] = useState("");
  const [details, setDetails] = useState("");
  const [qty, setQuantity] = useState("");
  const [city, setCity] = useState("");
  const [expired, setExpired] = useState(false);
  const [expiry_date, setExpiryDate] = useState();
  const [free, setFree] = useState(true);
  const [price, setPrice] = useState("");
  const [additionalnotes, setAdditionalNotes] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // ... (other form state variables)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data object with all form details
      const formData = new FormData();
      formData.append("type", type);
      formData.append("details", details);
      formData.append("qty", qty);
      formData.append("city", city);
      formData.append("expired", expired);
      if (expiry_date !== null) {
        formData.append("expiry_date", expiry_date);
      }
      formData.append("free", free);
      formData.append("price", price);
      formData.append("additionalnotes", additionalnotes);
      if (image !== null) {
        formData.append("image", image);
      }
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = token;
      // Make a POST request to your server endpoint with Axios
      const endpoint = free
        ? "http://localhost:5000/postdonation"
        : "http://localhost:5000/postdonationbusiness";

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: token,
        },
      });

      // Handle the response as needed
      console.log("Form submission successful:", response.data);

      //   swal({
      //     title: "Done!",
      //     text: "Your post will be posted after being verified.",
      //     icon: "success",
      //     timer: 10000, // Set the duration in milliseconds
      //     buttons: true, // Disable the close button
      //   });

      // Show a sweet alert after successful submission
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your post will be posted after being verified.",
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Form submission error:", error);
      if (error.response && error.response.status === 404) {
        // If the status code is 400, it means there is a specific error message
        navigate("/Subscription");
      }
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      {/* Modal content goes here */}
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Form</h2>
        {/* Your form inputs go here */}
        <form onSubmit={handleSubmit}>
          {/* Food type input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Food Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setFoodType(e.target.value)}
              className="mt-1 p-2 w-full border border-blue "
              placeholder="Enter food type"
            />
          </div>

          {/* Details input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Details
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="cooked meals, raw ingredients, etc."
            />
          </div>

          {/* Quantity input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="text"
              value={qty}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="servings, weight, units.."
            />
          </div>

          {/* City input (dropdown) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="" disabled>
                Select a city
              </option>
              <option value="Amman">Amman</option>
              <option value="Zarqa">Zarqa</option>
              <option value="Irbid">Irbid</option>
              <option value="AlSalt">AlSalt</option>
              <option value="Ajloun">Ajloun</option>
              <option value="Aqaba">Aqaba</option>
              <option value="Maan">Maan</option>
              <option value="Karak">Karak</option>
              <option value="Jerash">Jerash</option>
              <option value="Altafila">Altafila</option>
              {/* Add more cities as needed */}
            </select>
          </div>

          {/* Expired dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Is the food expired?
            </label>
            <select
              value={expired}
              onChange={(e) => {
                setExpired(e.target.value === "true");
                setExpiryDate(null);
              }}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Expiry date input */}
          {!expired && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Expiry Date
              </label>
              <input
                type="date"
                placeholder="Mention the date until which the food is safe to consume"
                value={expiry_date}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 p-2 w-full border border-blue"
              />
            </div>
          )}

          {/* Free/Paid dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Free/Paid
            </label>
            <select
              value={free}
              onChange={(e) => setFree(e.target.value === "true")}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="true">Free</option>
              <option value="false">Paid</option>
            </select>
          </div>

          {/* If it's paid, show the price input field */}
          {!free && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 w-full border border-blue"
                placeholder="Enter the price"
              />
            </div>
          )}

          {/* Image file input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 p-2 w-full border border-blue"
            />
          </div>

          {/* Additional notes textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Additional Notes
            </label>
            <textarea
              value={additionalnotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter additional notes..."
              rows="3"
            ></textarea>
          </div>

          {/* Add more input fields with similar structure */}

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

export default PostForm;
