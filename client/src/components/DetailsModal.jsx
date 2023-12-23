import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import Cookies from "js-cookie";

const PostForm = ({ showModal, onClose, id, role_id }) => {
  const [postData, setPostData] = useState([]);
  // console.log(postData[0].type);
  console.log("hi" + role_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(role_id);
        const endpoint =
          role_id == 3
            ? `http://localhost:5000/getconfirmhistorydonate/${id}`
            : `http://localhost:5000/getconfirmhistoryorder/${id}`;

        const response = await axios.get(endpoint);
        console.log(id);
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
        type: postData[0]?.type,
        details: postData[0]?.details,
        qty: postData[0]?.qty,
        city: postData[0]?.city,
        expired: postData[0]?.expired,
        expiry_date: postData[0]?.expiry_date,
        free: postData[0]?.free,
        price: postData[0]?.price,
        additionalnotes: postData[0]?.additionalnotes,
        imageurl: postData[0]?.imageurl,
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
      alert(error);

      // Show an error sweet alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the form. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Details</h2>
        {/* Display fetched data here */}
        <div>
          <p>
            <img
              className="w-full h-32 object-cover"
              src={postData[0]?.imageurl}
              alt="Food Image"
            />
          </p>
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
              <strong>Expiry Date:</strong>{" "}
              {postData[0]?.expiry_date.split("T")[0]}
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
          {role_id == 3 ? (
            <button
              type="button"
              onClick={handleRepost}
              className="text-white p-2 bg-blue "
            >
              Repost
            </button>
          ) : (
            ""
          )}
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
