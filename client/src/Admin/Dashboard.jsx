import React from "react";
import Users from "./Users";
import { useState } from "react";
import Posts from "./Posts";
import Side from "./Side";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Users");
  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex bg-background text-blue">
      <Side onSelectMenuItem={handleSelectMenuItem} />
      <div className="flex-grow p-8">
        {selectedMenuItem && (
          <div>
            {selectedMenuItem === "Users" && <Users />}
            {selectedMenuItem === "Posts" && <Posts />}

            {/* Add more conditions for other menu items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
