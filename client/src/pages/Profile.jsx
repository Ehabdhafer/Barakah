import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import Requests from "../components/Requests";
import History from "../components/History";
import Generalinfo from "../components/Generalinfo";
import ProfileAvatar from "../components/Avatar";
import ChangePassword from "../components/ChangePassword";
import Cookies from "js-cookie";

const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("History");
  const [userData, setUserData] = useState(null); // Initialize as null to indicate data is not yet fetched

  useEffect(() => {
    // Fetch user data using Axios
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get("http://localhost:5000/user");
        setUserData(response.data); // Assuming the response contains user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  // Render loading state while user data is being fetched
  if (userData === null) {
    return <div>Loading...</div>;
  }

  // Render the profile page once user data is available
  return (
    <div className=" bg-background text-blue">
      {console.log("role from profile", userData[0]?.role_id)}
      <SideBar
        role={userData[0]?.role_id}
        onSelectMenuItem={handleSelectMenuItem}
      />

      <div className="flex-grow p-8">
        {selectedMenuItem && (
          <div>
            {selectedMenuItem === "Requests" && <Requests />}
            {selectedMenuItem === "History" && (
              <History role={userData[0]?.role_id} />
            )}
            {/* {console.log(userData[0]?.role_id)} */}
            {selectedMenuItem === "Settings" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
                <div className="md:col-span-2 md:row-span-1 ml-16">
                  <ProfileAvatar
                    oldProfileImage={userData[0].imageurl}
                    username={userData[0].username}
                  />
                </div>
                <div className="md:col-span-2 md:row-span-2">
                  <Generalinfo initialData={userData} />
                </div>
                <div className="md:col-span-2 md:row-span-1">
                  <ChangePassword />
                </div>
              </div>
            )}
            {/* Add more conditions for other menu items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
