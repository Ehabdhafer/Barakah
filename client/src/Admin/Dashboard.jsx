import React from "react";
import Users from "./Users";
import { useState } from "react";
import Posts from "./Posts";
import Side from "./Side";
import ContactTable from "./Contact";
import OrdersTable from "./Orders";
import Dash from "./Dash";
import FeedbackTable from "./Feedback";
import Navbar from "../components/Nav";
import { menu } from "@material-tailwind/react";
import { useAuth } from "../hooks/Authcontext";
import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26577C",
      cancelButtonColor: "gray",
      confirmButtonText: "log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/signin");
      }
    });
  };

  const handleSelectMenuItem = (menuItem) => {
    if (menuItem == "logout") {
      handleLogout();
    } else setSelectedMenuItem(menuItem);
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
              {selectedMenuItem === "feedback" && <FeedbackTable />}

              {/* Add more conditions for other menu items */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
