import React, { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head
const TABLE_HEAD = [
  "Order ID",
  "Food Type",
  "Provider Name",
  "Provider Location",
  "Provider Phone",
  "Collection Time",
  "Receiver Name",
  "Receiver Location",
  "Receiver Phone",
  "Action",
];

const OrdersTable = () => {
  // State to store table rows, search term, and pagination
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Make an Axios request to your API endpoint with pagination parameters
    Axios.get(
      `http://localhost:5000/gitconfirmhistoryall?page=${currentPage}&search=${searchTerm}`
    )
      // {search:searchTerm}
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setTableRows(response.data);
        setTotalItems(response.data[0].total_count);

        console.log(response.data[0].total_count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, itemsPerPage]); // The effect runs when currentPage or itemsPerPage changes

  // Handle delete button click
  const handleDelete = (user_id) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;
    Axios.put(`http://localhost:5000/deleteuser/${user_id}`)
      .then((response) => {
        console.log(`Deleting user with id ${user_id}`);
      })
      .catch((error) => {});
  };

  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      Axios.get(
        `http://localhost:5000/gitconfirmhistoryall?page=${currentPage}&search=${searchTerm}`
      )
        // {search:searchTerm}
        .then((response) => {
          // Assuming the API response has a data property that contains the rows
          setTableRows(response.data);
          setTotalItems(response.data[0].total_count);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      // Trigger the search when Enter key is pressed
      setCurrentPage(1); // Reset the page to 1 when a new search is performed
      // You can perform additional logic here if needed before triggering the search
      setSearchTerm(e.target.value);
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="text-blue text-3xl font-bold ml-[22%] mb-4">Orders</div>
      {/* Add the search input field */}
      <div className="w-1/4 flex ml-[22%]">
        <Input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleSearchOnEnter(e)}
          className="bg-white w-[300px] border border-blue "
        />
      </div>

      <Card className="h-full w-[70%] mt-8 ml-[22%]  bg-blue-gray-50/50 overflow-auto ">
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead className="bg-white">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className=" bg-blue-gray p-4">
                    <Typography className="text-md leading-none font-semibold text-blue">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(
                (
                  {
                    type,
                    confirm_id,
                    order_id,
                    donationn,
                    accept_location,
                    phone,
                    collectiontime,
                    requestn,
                    order_city,
                    orderphone,
                  },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  return (
                    <tr key={order_id} className={classes}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {donationn}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {accept_location}
                          {console.log(accept_location)}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {collectiontime.split("T")[1].split(".")[0]}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {collectiontime.split("T")[0]}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {requestn}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order_city}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {orderphone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete Order">
                          <IconButton
                            variant="text"
                            onClick={() => handleDelete(confirm_id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Pagination controls */}
      <div className="flex justify-end mt-4 mr-24">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="bg-blue hover:bg-blue-600 text-white mr-4 cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Previous
        </button>
        <span className="mr-4 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages + 1))
          }
          disabled={currentPage === totalPages}
          className="ml-4 bg-blue hover-bg-blue-600 text-white cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
