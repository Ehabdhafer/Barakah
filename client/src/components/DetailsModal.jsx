import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import Cookies from "js-cookie"


const PostForm = ({ showModal, onClose,id }) => {
  const [postData, setPostData] = useState([]);
  // console.log(postData[0].type);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get(`http://localhost:5000/getconfirmhistory/${id}`); // Replace '1' with the actual post ID you want to display
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRepost = async () => {
    try {
      // Prepare the data object with all form details
      const formData = {
        type:postData.type,
        details:postData.details,
        qty:postData.qty,
        city:postData.city,
        expired:postData.expired,
        expiry_date:postData.expiry_date,
        free:postData.free,
        price:postData.price,
        additionalnotes:postData.additionalnotes,
        // Add other form fields as needed
      };
const token = Cookies.get("token");
axios.defaults.headers.common["Authorization"] = token;
      // Make a POST request to your server endpoint with Axios
      
      const response = await axios.post(
        `http://localhost:5000/repostdonation`,
        formData
      );

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
      alert(error)

      // Show an error sweet alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the form. Please try again.",
      });

  }}

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Details</h2>
        {/* Display fetched data here */}
        <div>
          <p>
            <strong>Food Type:</strong> {postData[0]?.type}
          </p>
          <p>
            <strong>Details:</strong> {postData[0]?.details}
          </p>
          <p>
            <strong>Quantity:</strong> {postData[0]?.qty}
          </p>
          <p>
            <strong>City:</strong> {postData[0]?.city}
          </p>
          <p>
            <strong>Is Expired:</strong> {postData[0]?.expired ? "Yes" : "No"}
          </p>
          {!postData[0]?.expired && (
            <p>
              <strong>Expiry Date:</strong> {postData[0]?.expiry_date}
            </p>
          )}
          <p>
            <strong>Free/Paid:</strong> {postData[0]?.free ? "Free" : "Paid"}
          </p>
          {!postData[0]?.free && (
            <p>
              <strong>Price:</strong> {postData[0]?.price}
            </p>
          )}
          <p>
            <strong>Additional Notes:</strong> {postData[0]?.additionalnotes}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={handleRepost}
            className="text-white p-2 bg-blue "
          >
            Repost
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-blue  hover:underline"
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PostForm;
