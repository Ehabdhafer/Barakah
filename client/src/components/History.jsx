import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailsModal from "./DetailsModal";
import FeedbackFormModal from "./FeedbackModal";

const History = (role) => {
  const [foodData, setFoodData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("roooleee", role.role);
        const endpoint =
          role.role === 3
            ? "http://localhost:5000/getconfirmhistorydonate"
            : "http://localhost:5000/getconfirmhistoryorder";

        const response = await axios.get(endpoint);
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [role.role]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const openFeedbackModal = () => {
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-8 flex justify-center mb-20 ">
      <table className="w-[80%] text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-md text-blue uppercase bg-[#ececec] ">
          <tr>
            <th scope="col" className="px-6 py-5 text-center">
              Food Type
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Date
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Post Details
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food, index) => (
            <tr
              key={food.donation_id}
              className={`${
                index % 2 !== 0 ? "bg-[#ececec]" : "bg-white"
              } border-b-[0.01rem] border-[#d8d6d6] hover:bg-[#ececec] text-center`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {food.type}
              </td>
              <td className="px-6 py-4">
                {food.date.split("T")[0]}
                <p></p>
                {food.time}
              </td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  className="font-medium bg-blue text-white p-2 shadow-md "
                  onClick={() => openModal(food.donation_id)}
                >
                  Show Details
                </button>
              </td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  className="font-medium bg-blue text-white p-2 shadow-md "
                  onClick={openFeedbackModal}
                >
                  Share Your Experience
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {feedbackModalOpen && (
        <FeedbackFormModal
          isOpen={feedbackModalOpen}
          onClose={closeFeedbackModal}
        />
      )}
      {isModalOpen && (
        <DetailsModal
          showModal={isModalOpen}
          onClose={closeModal}
          id={selectedPost}
          role_id={role.role}
        />
      )}
    </div>
  );
};

export default History;
