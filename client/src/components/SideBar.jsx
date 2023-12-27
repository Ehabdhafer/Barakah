import React, { useState } from "react";
import {
  PresentationChartBarIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const SideBar = ({ onSelectMenuItem, role }) => {
  // Initialize selectedItem based on role.role
  console.log("role from sidebar", role);
  const initialSelectedItem = role === 3 ? "Requests" : "History";
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  const menuItems = [
    { name: "History", icon: RectangleStackIcon },
    { name: "Settings", icon: Cog6ToothIcon },
    { name: "Log Out", icon: ArrowLeftOnRectangleIcon },
  ];

  // If role.role is 3, add the "Requests" item to the menuItems array
  if (role === 3) {
    menuItems.unshift({ name: "Requests", icon: PresentationChartBarIcon });
  }

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName); // Update the selected item
    onSelectMenuItem(itemName);
  };

  return (
    <nav className="bg-white h-16 flex justify-around px-10">
      <div className="flex justify-around">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuItemClick(item.name)}
            className={`flex items-center p-4 px-10 ${
              selectedItem === item.name
                ? "bg-blue text-white font-medium"
                : "text-blue font-medium"
            } cursor-pointer`}
          >
            <item.icon className="h-6 w-6 mr-2" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
