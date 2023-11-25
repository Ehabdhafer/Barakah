import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailsModal from "./DetailsModal";

const History = () => {
  const [foodData, setFoodData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getconfirmhistory");
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 flex justify-center">
      <table className="w-[80%] text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-md text-blue uppercase bg-white ">
          <tr>
            <th scope="col" className="px-6 py-5 text-center">
              Food Type
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Date
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food) => (
            <tr
              key={food.donation_id} // Replace 'id' with the actual identifier property from your API data
              className="bg-white border-b-[0.01rem] border-[#00000023] hover:bg-[#ececec] text-center"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {food.type}
              </td>
              <td className="px-6 py-4">{food.date}</td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  className="font-medium bg-blue text-white p-2 shadow-md hover:underline"
                  onClick={() => openModal(food)}
                >
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DetailsModal
          showModal={isModalOpen}
          onClose={closeModal}
          postData={selectedPost}
        />
      )}
    </div>
  );
};

export default History;
