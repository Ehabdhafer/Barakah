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
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head
const TABLE_HEAD = ["User", "Email", "Feedback", "Sent at", "Action"];

const FeedbackTable = () => {
  // State to store table rows
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    // Make an Axios request to your API endpoint to fetch feedback data
    Axios.get(`http://localhost:5000/getallfeedbacks`)
      .then((response) => {
        setTableRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The effect runs only once on component mount

  // Handle delete button click
  const handleDelete = (feedback_id) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;
    Axios.put(`http://localhost:5000/deletefeedback/${feedback_id}`)
      .then((response) => {
        // Filter out the deleted feedback from the tableRows state
        setTableRows((prevRows) =>
          prevRows.filter((row) => row.feedback_id !== feedback_id)
        );
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });
  };

  return (
    <div>
      <div className="text-blue text-3xl font-bold ml-[25%] mb-4">Feedback</div>
      <Card className="h-full w-[70%] mt-8 ml-[25%] bg-blue-gray-50/50">
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead className="bg-white">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="bg-blue-gray p-4">
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
                  { username, email, message, created_at, feedback_id },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  // Truncate the message if it's too long
                  const truncatedMessage =
                    message.length > 50
                      ? `${message.slice(0, 50)}...`
                      : message;

                  return (
                    <tr key={feedback_id} className={classes}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {username}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {truncatedMessage}
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
                          className="font-normal"
                        >
                          {created_at.split("T")[1].split(".")[0]}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete Feedback">
                          <IconButton
                            variant="text"
                            onClick={() => handleDelete(feedback_id)}
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
    </div>
  );
};

export default FeedbackTable;
