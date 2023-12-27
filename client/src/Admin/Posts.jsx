import { useState, useEffect } from "react";
import Details from "./Details";
import Axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head for posts
const POSTS_TABLE_HEAD = [
  "Food Type",
  "Image",
  "Username",
  "Created Time",
  "Status",

  "Action",
];

const Posts = (overview) => {
  const [tableRows, setTableRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Expired", value: "expired" },
    { label: "Not Expired", value: "not_expired" },
  ];

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    let endpoint = "";

    // Determine the endpoint based on the selected filter value
    switch (selectedFilter) {
      case "all":
        endpoint = "http://localhost:5000/sortdonation";
        break;
      case "approved":
        endpoint = "http://localhost:5000/alldonation/approved";
        break;
      case "pending":
        endpoint = "http://localhost:5000/alldonation/pending";
        break;
      case "expired":
        endpoint = "http://localhost:5000/getexpireddonation";
        break;
      case "not_expired":
        endpoint = "http://localhost:5000/getnotexpireddonation";
        break;
      default:
        endpoint = "http://localhost:5000/sortdonation";
    }

    // Check if the endpoint supports pagination and search
    if (endpoint.includes("sortdonation")) {
      // Fetch data from the endpoint with pagination and search
      Axios.get(`${endpoint}?page=${currentPage}&search=${searchTerm}`)
        .then((response) => {
          setTableRows(response.data);
          setTotalItems(response.data[0].total_count);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Fetch data from the endpoint without search
      Axios.get(`${endpoint}?page=${currentPage}`)
        .then((response) => {
          setTableRows(response.data);
          setTotalItems(response.data[0].total_count);
          // Update totalItems based on the response if needed
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [currentPage, itemsPerPage, selectedFilter]);

  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      Axios.get(
        `http://localhost:5000/sortdonation?page=${currentPage}&search=${searchTerm}`
      )
        .then((response) => {
          setTableRows(response.data);
          setTotalItems(response.data[0].total_count);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      setCurrentPage(1);
      setSearchTerm(e.target.value);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="text-blue text-3xl font-bold ml-[25%] mb-4">Posts</div>
      {overview.overview == "no" && (
        <div className="flex justify-between">
          <div className="w-1/4 ml-[25%]">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => handleSearchOnEnter(e)}
              className="bg-white border border-gray p-2 rounded-sm"
            />
          </div>
          <div className="w-1/7 mr-16 ">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="text-blue bg-white rounded-sm border-gray"
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <Card className="h-full  mt-8 ml-[25%] w-[70%] ">
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {POSTS_TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue"
                      className="text-md leading-none opacity-70 font-bold text-blue"
                    >
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
                    username,
                    role_id,
                    date,
                    donation_id,
                    status,
                    imageurl,
                    time,
                  },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  return (
                    <tr key={donation_id} className={classes}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {type}
                        </Typography>
                      </td>
                      <td
                        className={classes}
                        onClick={() => openImageModal(imageurl)}
                      >
                        <img
                          src={imageurl}
                          alt="Image"
                          size="small"
                          color="lightBlue"
                          className="w-10 h-10 object-cover ml-3 cursor-pointer"
                        />
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {username}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {role_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date.split("T")[0]}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {time}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color={status == "approved" ? "blue" : "blue"}
                          className="font-medium"
                        >
                          {status}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Button
                          color="blue"
                          className="text-blue  px-2 border"
                          onClick={() => openModal(donation_id)}
                        >
                          Show Details
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        {isModalOpen && (
          <Details
            showModal={isModalOpen}
            onClose={closeModal}
            id={selectedPost}
          />
        )}
        {isImageModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50  ">
            <div
              className="absolute top-0 left-0 w-full h-full bg-white opacity-75"
              onClick={closeImageModal}
              style={{ backdropFilter: "blur(10px)" }}
            />
            <div className="relative h-[40%] w-[40%] flex justify-center items-center text-center">
              <img src={selectedImage} alt="Large Image" className="" />
            </div>
            <button
              onClick={closeImageModal}
              className="w-10 h-10 text-blue absolute top-4 right-4 text-3xl font-semibold"
            >
              x
            </button>
          </div>
        )}
      </Card>
      {overview.overview == "no" && (
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

export default Posts;
