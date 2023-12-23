// import React, { useState } from "react";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import logo from "../assets/logo.png";
// import {
//   PresentationChartBarIcon,
//   ChevronRightIcon,
//   ChevronDownIcon,
//   Cog6ToothIcon,
//   PowerIcon,
//   RectangleStackIcon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/solid";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/Authcontext";

// const Side = ({ onSelectMenuItem }) => {
//   const navigate = useNavigate();
//   // Assuming isAuthenticated is a boolean state that tracks user authentication status
//   const { isAuthenticated, logout } = useAuth();
//   const location = useLocation();

//   // Function to handle user logout (clear authentication status)
//   const handleLogout = () => {
//     logout();
//     if (location.pathname === "/") {
//       window.location.reload();
//     } else {
//       navigate("/");
//     }
//     // Your logout logic here
//   };
//   const [open, setOpen] = useState(0);
//   const [selectedMenuItem, setSelectedMenuItem] = useState("Users");

//   const handleOpen = (value, menuItem) => {
//     setOpen(open === value ? 0 : value);
//     setSelectedMenuItem(menuItem);
//   };

//   const menuItems = [
//     { name: "Users", icon: PresentationChartBarIcon },
//     { name: "Posts", icon: RectangleStackIcon },
//     { name: "Contact", icon: Cog6ToothIcon },
//     { name: "Orders", icon: ArrowLeftOnRectangleIcon },
//     { name: "Log Out", icon: ArrowLeftOnRectangleIcon, onClick: handleLogout },
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-full z-50">
//       <Card className="h-[calc(100vh)] w-full max-w-[15rem] p-4 rounded-none  shadow-xl shadow-blue-gray-900/5 text-blue  ">
//         <div className="mb-2 ">
//           <img src={logo} alt="logo" />
//         </div>
//         <List>
//           {menuItems.map((menuItem, index) => (
//             <Accordion key={index} open={open === index + 1}>
//               <ListItem className="pr-8 pb-0">
//                 <AccordionHeader
//                   onClick={() => {
//                     handleOpen(index + 1, menuItem.name);
//                     onSelectMenuItem(menuItem.name);
//                   }}
//                   className={`border-b-0 p-3 cursor-pointer ${
//                     selectedMenuItem === menuItem.name
//                       ? "bg-blue text-white"
//                       : ""
//                   }`}
//                 >
//                   <ListItemPrefix>
//                     {React.createElement(menuItem.icon, {
//                       className: "h-5 w-5 ",
//                     })}
//                   </ListItemPrefix>
//                   <Typography className=" font-semibold">
//                     {menuItem.name}
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//             </Accordion>
//           ))}
//         </List>
//         {/* Log Out button */}
//         <button
//           onClick={handleLogout}
//           className="ml-4 bg-transparent text-blue py-2 px-4 text-md font-semibold"
//         >
//           Log Out
//         </button>
//       </Card>
//     </div>
//   );
// };

// export default Side;

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/Authcontext";

const Side = ({ onSelectMenuItem }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
    // Your logout logic here
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const menus = [
    { name: "dashboard", icon: MdOutlineDashboard },
    { name: "users", icon: AiOutlineUser },
    { name: "posts", icon: FiFolder },
    { name: "orders", icon: FiShoppingCart },
    { name: "messages", icon: FiMessageSquare },
    // { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    // { name: "File Manager", link: "/", icon: FiFolder },
    // { name: "Cart", link: "/", icon: FiShoppingCart },
    // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6 fixed z-50  ">
      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500  px-4`}
      >
        <div className="py-3 flex justify-between">
          <div className={`w-[55%] ${open ? "" : "hidden"} `}>
            <img src={logo} alt="logo" />
          </div>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative ${} ">
          {menus?.map((menu, i) => (
            <button
              onClick={() => {
                onSelectMenuItem(menu.name); // Change from menus.name to menu.name
              }}
              key={i}
              className={`
    
     group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-blue hover:text-white rounded-md
     ${selectedMenuItem === menu.name && "font-bold"} 
   `}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 bg-transparent text-blue py-2 px-4 text-md font-semibold"
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default Side;
