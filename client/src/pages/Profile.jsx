import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import Requests from "../components/Requests";
import History from "../components/History";
import Generalinfo from "../components/Generalinfo";
import ProfileAvatar from "../components/Avatar";
import ChangePassword from "../components/ChangePassword";
import Cookies from "js-cookie"


const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Requests");
  const [userData, setUserData] = useState({}); // State to store user data

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
  return (
    <div className="flex bg-background text-blue">
      <SideBar onSelectMenuItem={handleSelectMenuItem} />
      <div className="flex-grow p-8">
        {selectedMenuItem && (
          <div>
            {selectedMenuItem === "Requests" && <Requests />}
            {selectedMenuItem === "History" && <History role={userData[0]?.role_id}/>}
            {/* {console.log(userData[0]?.role_id)} */}
            {selectedMenuItem === "Settings" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 md:row-span-1">
                  <ProfileAvatar
                    oldProfileImage={userData[0].imageurl}
                    username={userData[0].username}
                  />
                </div>
                <div className="md:col-span-2 md:row-span-2">
                  <Generalinfo initialData={userData} />
                </div>
                <div className="md:col-span-1 md:row-span-1">
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
