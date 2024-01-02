import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestForm from "./RequestForm"; // Import the RequestForm component
import AcceptForm from "./AcceptForm";
import Cookies from "js-cookie";

const Requests = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;

    // Fetch data using Axios when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getorderid");
        // Assuming the API returns an array of objects with properties like 'username', 'industry', 'foodType'
        setRequestsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  const handleAcceptClick = (orderId) => {
    // Set state to open the modal
    setRequestModalOpen(true);
    setOrderId(orderId);
    // console.log(orderId);
  };

  const handleRequestModalClose = () => {
    // Set state to close the modal
    setRequestModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 w-[80%] mx-auto mb-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-md text-blue uppercase bg-[#ececec]  ">
          <tr>
            <th scope="col" className="px-6 py-5 text-center">
              Requester Name
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Requester Industry
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Requested Post
            </th>
            <th scope="col" className="px-6 py-5 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {requestsData.map((requestData, index) => (
            <tr
              key={requestData.order_id} // Replace 'id' with the actual identifier property from your API data
              className={`${
                index % 2 !== 0 ? "bg-[#ececec]" : "bg-white"
              } border-b-[0.01rem] border-[#d8d6d6] hover:bg-[#ececec] text-center`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {requestData.username}
              </th>
              <td className="px-6 py-4">{requestData.industry}</td>
              <td className="px-6 py-4">{requestData.type}</td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  onClick={() => handleAcceptClick(requestData.order_id)}
                  className="font-medium bg-blue text-white p-2 shadow-md hover:underline"
                >
                  Accept
                </button>
                <a href="#" className="font-medium p-2 hover:underline">
                  Decline
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RequestForm modal */}
      <AcceptForm
        isOpen={isRequestModalOpen}
        onClose={handleRequestModalClose}
        orderId={orderId}
      />
    </div>
  );
};

export default Requests;
