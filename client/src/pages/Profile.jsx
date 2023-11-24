import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Requests from "../components/Requests";
import History from "../components/History";

const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Requests");

  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex bg-background">
      <SideBar onSelectMenuItem={handleSelectMenuItem} />
      <div className="flex-grow p-8">
        {selectedMenuItem && (
          <div>
            {selectedMenuItem === "Requests" && <Requests />}
            {selectedMenuItem === "History" && <History />}
            {/* Add more conditions for other menu items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
