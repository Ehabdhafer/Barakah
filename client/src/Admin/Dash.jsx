import React, { useState, useEffect } from "react";
import Users from "./Users";
import Posts from "./Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFileAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CircleChart from "./CircleChart";

const Dash = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);

  useEffect(() => {
    // Fetch Users Count
    axios
      .get("http://localhost:5000/countalluser")
      .then((response) => {
        console.log(response);
        setUsersCount(response.data[0].count);
      })
      .catch((error) => {
        console.error("Error fetching users count:", error);
      });

    // Fetch Posts Count
    axios
      .get("http://localhost:5000/countdonation")
      .then((response) => {
        setPostsCount(response.data[0].count);
      })
      .catch((error) => {
        console.error("Error fetching posts count:", error);
      });

    // Fetch Subscribers Count
    axios
      .get("http://localhost:5000/countusersub")
      .then((response) => {
        setSubscribersCount(response.data[0].count);
      })
      .catch((error) => {
        console.error("Error fetching subscribers count:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <div className="w-[70%] grid grid-cols-1 md:grid-cols-3 gap-4 ml-[25%] mb-10">
        {/* Users Count */}
        <div className="bg-blue p-6 rounded-md text-white">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-3xl mr-4" />
            <div>
              <p className="text-lg font-bold">All Users</p>
              <p className="text-2xl">{usersCount}</p>
            </div>
          </div>
        </div>

        {/* Posts Count */}
        <div className="bg-white p-6 rounded-md text-blue">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="text-3xl mr-4" />
            <div>
              <p className="text-lg font-bold">All Posts</p>
              <p className="text-2xl">{postsCount}</p>
            </div>
          </div>
        </div>

        {/* Subscribers Count */}
        <div className="bg-gray p-6 rounded-md text-white">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUserPlus} className="text-3xl mr-4" />
            <div>
              <p className="text-lg font-bold">All Subscribers</p>
              <p className="text-2xl">{subscribersCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Circle Chart */}
      <CircleChart
        subscribersCount={subscribersCount}
        totalUsersCount={usersCount}
      />

      <Users overview="yes" />
      <div className="mt-10"></div>
      <Posts overview="yes" />
    </div>
  );
};

export default Dash;
