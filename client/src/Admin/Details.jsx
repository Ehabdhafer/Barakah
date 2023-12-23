import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { FaTimes } from "react-icons/fa";

const Details = ({ showModal, onClose, id }) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/donation/${id}`
        ); // Replace '1' with the actual post ID you want to display
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure you want to accept this post?",
      showCancelButton: true,
      confirmButtonText: "Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Perform the accept action using Axios
        await axios.put(`http://localhost:5000/approveDonation/${id}`);
        Swal.fire({
          icon: "success",
          title: "Accepted!",
          text: "The post has been accepted.",
        });
        onClose(); // Close the modal
      } catch (error) {
        console.error("Error accepting post:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while accepting the post.",
        });
      }
    }
  };

  const handleReject = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure you want to reject this post?",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Perform the reject action using Axios
        await axios.put(`http://localhost:5000/rejectDonation/${id}`);
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "The post has been rejected.",
        });
        onClose(); // Close the modal
      } catch (error) {
        console.error("Error rejecting post:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while rejecting the post.",
        });
      }
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Details</h2>
        {/* Display fetched data here */}
        <div>
          <FaTimes
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          />
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
            onClick={handleAccept}
            className="text-white p-2 bg-blue "
          >
            Accept
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="text-blue  hover:underline"
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Details;
