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
import logo from "../assets/logo.png";
import {
  PresentationChartBarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  RectangleStackIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Side = ({ onSelectMenuItem }) => {
  const [open, setOpen] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Users");

  const handleOpen = (value, menuItem) => {
    setOpen(open === value ? 0 : value);
    setSelectedMenuItem(menuItem);
  };

  const menuItems = [
    { name: "Users", icon: PresentationChartBarIcon },
    { name: "Posts", icon: RectangleStackIcon },
    { name: "Contact", icon: Cog6ToothIcon },
    { name: "Orders", icon: ArrowLeftOnRectangleIcon },
    { name: "Log Out", icon: ArrowLeftOnRectangleIcon },
  ];

  return (
    <div className="fixed top-0 left-0 h-full z-50">
      <Card className="h-[calc(100vh)] w-full max-w-[15rem] p-4 rounded-none  shadow-xl shadow-blue-gray-900/5 text-blue  ">
        <div className="mb-2 ">
          <img src={logo} alt="logo" />
        </div>
        <List>
          {menuItems.map((menuItem, index) => (
            <Accordion key={index} open={open === index + 1}>
              <ListItem className="pr-8 pb-0">
                <AccordionHeader
                  onClick={() => {
                    handleOpen(index + 1, menuItem.name);
                    onSelectMenuItem(menuItem.name);
                  }}
                  className={`border-b-0 p-3 cursor-pointer ${
                    selectedMenuItem === menuItem.name
                      ? "bg-blue text-white"
                      : ""
                  }`}
                >
                  <ListItemPrefix>
                    {React.createElement(menuItem.icon, {
                      className: "h-5 w-5 ",
                    })}
                  </ListItemPrefix>
                  <Typography className=" font-semibold">
                    {menuItem.name}
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </Accordion>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default Side;
