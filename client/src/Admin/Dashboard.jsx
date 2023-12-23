import React from "react";
import Users from "./Users";
import { useState } from "react";
import Posts from "./Posts";
import Side from "./Side";
import ContactTable from "./Contact";
import OrdersTable from "./Orders";
import Dash from "./Dash";
const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
    console.log(selectedMenuItem);
  };

  return (
    <div className="bg-background h-screen">
      <div className="flex bg-background  text-blue">
        <Side onSelectMenuItem={handleSelectMenuItem} />

        <div className="flex-grow  p-8">
          {selectedMenuItem && (
            <div>
              {selectedMenuItem === "dashboard" && <Dash />}
              {selectedMenuItem === "users" && <Users overview="no" />}
              {selectedMenuItem === "posts" && <Posts overview="no" />}
              {selectedMenuItem === "messages" && <ContactTable />}
              {selectedMenuItem === "orders" && <OrdersTable />}

              {/* Add more conditions for other menu items */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
