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
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head for posts
const POSTS_TABLE_HEAD = [
  "Food Type",
  "Username",
  "Created Time",
  "status",
  "Action",
];

const Posts = () => {
  // State to store table rows for posts
  const [postsTableRows, setPostsTableRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    // Make an Axios request to your API endpoint for posts
    Axios.get(`http://localhost:5000/sortdonation?page=1`)
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setPostsTableRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <Card className="h-full  mt-8 ml-[20%] w-[80%] ">
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
            {postsTableRows.map(
              ({ type, username, role_id, created_at, donation_id ,status}, index) => {
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
                        {created_at}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {status}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button
                        color="blue"
                        className="bg-blue"
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
    </Card>
  );
};

export default Posts;