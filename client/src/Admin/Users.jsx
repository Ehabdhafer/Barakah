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
  "User",
  "Role",
  "City",
  "Phone",
  "Created at",
  "Subscription",
  "Action",
];

const Users = (overview) => {
  // State to store table rows, search term, and pagination
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data from API when component mounts or when pagination changes
  useEffect(() => {
    // Make an Axios request to your API endpoint with pagination parameters
    Axios.get(
      `http://localhost:5000/alluser?page=${currentPage}&search=${searchTerm}`
    )
      .then((response) => {
        setTableRows(response.data);
        setTotalItems(response.data[0].total_count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, itemsPerPage]);

  // Handle delete button click
  const handleDelete = (user_id) => {
    Axios.put(`http://localhost:5000/deleteuser/${user_id}`)
      .then((response) => {
        // Filter out the deleted user from the tableRows state
        setTableRows((prevRows) =>
          prevRows.filter((row) => row.user_id !== user_id)
        );
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleAddLogo = (user_id, logoFile) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("image", logoFile);
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;

    Axios.post("http://localhost:5000/postpartners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // Handle success
        console.log("Logo added successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding logo:", error);
      });
  };

  // Handle search on Enter key press
  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      Axios.get(
        `http://localhost:5000/alluser?page=${currentPage}&search=${searchTerm}`
      )
        .then((response) => {
          setTableRows(response.data);
          setTotalItems(response.data[0].total_count);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setCurrentPage(1); // Reset the page to 1 when a new search is performed
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="text-blue text-3xl font-bold ml-[25%] mb-4">Users</div>

      {overview.overview === "no" && (
        <div className="w-1/4 flex ml-[25%]">
          <Input
            type="text"
            placeholder="Search..."
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleSearchOnEnter(e)}
            className="bg-white w-[300px] border border-blue"
          />
        </div>
      )}

      <Card className="h-full  mt-8  bg-blue-gray-50/50 ml-[25%] w-[70%] ">
        <CardBody className="px-0 ">
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
                    imageurl,
                    username,
                    email,
                    role_id,
                    industry,
                    city,
                    phone,
                    created_at,
                    subscription,
                    user_id,
                  },
                  index
                ) => {
                  const roleLabel =
                    role_id === 1
                      ? "admin"
                      : role_id === 2
                      ? "recycling agency"
                      : role_id === 3
                      ? "provider"
                      : role_id === 4
                      ? "charity"
                      : "";
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  const subscriptionStatus = subscription
                    ? "Subscriber"
                    : "Not Subscriber";

                  return (
                    <tr key={email} className={classes}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={imageurl} alt={username} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {roleLabel}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {industry}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 "
                        >
                          {city}
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
                          {created_at.split("T")[0]}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal "
                        >
                          {created_at.split("T")[1].split(".")[0]}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {subscriptionStatus}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <div className="flex ">
                          {true && (
                            <label
                              htmlFor="profileImageInput"
                              className="block text-blue cursor-pointer  p-2 hover:underline  mx-auto"
                            >
                              Attach Logo
                              <input
                                type="file"
                                id="profileImageInput"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleAddLogo(user_id, e.target.files[0])
                                }
                              />
                            </label>
                          )}
                          <Tooltip content="Delete User">
                            <IconButton
                              variant="text"
                              onClick={() => handleDelete(user_id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
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
      {overview.overview === "no" && (
        <div className="flex justify-end mt-4 mr-16">
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
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="ml-4 bg-blue hover:bg-blue-600 text-white cursor-pointer px-4 py-2 rounded focus:outline-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
