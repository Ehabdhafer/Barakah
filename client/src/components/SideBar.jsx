import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  RectangleStackIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const SideBar = ({ onSelectMenuItem }) => {
  const [open, setOpen] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Requests");

  const handleOpen = (value, menuItem) => {
    setOpen(open === value ? 0 : value);
    setSelectedMenuItem(menuItem);
  };

  const menuItems = [
    { name: "Requests", icon: PresentationChartBarIcon },
    { name: "History", icon: RectangleStackIcon },
    { name: "Settings", icon: Cog6ToothIcon },
    { name: "Log Out", icon: ArrowLeftOnRectangleIcon },
  ];

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5 text-blue">
      <div className="mb-2 ">
        <Typography variant="h5" color="blue-gray">
          {/* Sidebar */}
        </Typography>
      </div>
      <List>
        {menuItems.map((menuItem, index) => (
          <Accordion key={index} open={open === index + 1}>
            <ListItem className="p-0">
              <AccordionHeader
                onClick={() => {
                  handleOpen(index + 1, menuItem.name);
                  onSelectMenuItem(menuItem.name);
                }}
                className={`border-b-0 p-3 cursor-pointer ${
                  selectedMenuItem === menuItem.name ? "bg-blue text-white" : ""
                }`}
              >
                <ListItemPrefix>
                  {React.createElement(menuItem.icon, {
                    className: "h-5 w-5 mr-3",
                  })}
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-semibold">
                  {menuItem.name}
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Accordion>
        ))}
      </List>
    </Card>
  );
};

export default SideBar;
