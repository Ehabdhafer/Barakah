// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import food from "../assets/food.png";

// const Donations = () => {
//   const [donations, setDonations] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const productsPerPage = 15; // Set the number of products per page

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/getdonation")
//       .then((response) => {
//         setDonations(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const pageCount = Math.ceil(donations.length / productsPerPage);
//   const displayedProducts = donations.slice(
//     pageNumber * productsPerPage,
//     (pageNumber + 1) * productsPerPage
//   );

//   const handlePageClick = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   return (
//     <div className="bg-background text-blue">
//       <img
//         src="https://images.unsplash.com/photo-1550895030-823330fc2551?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2ltcGxlJTIwcGF0dGVybnxlbnwwfHwwfHx8MA%3D%3D"
//         className="w-full h-48 object-cover"
//       />
//       <div className=" lg:mx-32 ">
//         <div className="flex justify-between mt-10 mx-20">
//           <Link to="/signup" title="">
//             <button className="bg-orange  text-white py-2 px-4 shadow text-md font-semibold mt-9">
//               Add Post
//             </button>{" "}
//           </Link>
//         </div>

//         <div className="flex flex-col justify-center items-center flex-wrap mt-14">
//           <div className="flex flex-wrap gap-3 justify-around">
//             {displayedProducts.map((donation) => (
//               <div
//                 key={donation.donation_id}
//                 className="max-w-sm w-[340px] overflow-hidden shadow-lg mb-5"
//               >
//                 <img className="w-full" src={food} alt="Food Image" />
//                 <div className="px-6 py-4 bg-white h-40">
//                   <Link to="/details">
//                     <div className="font-bold text-xl mb-2 text-blue">
//                       {donation.type}
//                     </div>
//                   </Link>
//                   <div className="text-gray-700 text-base inline-block">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className="w-5 h-5 inline-block"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//                       />
//                     </svg>
//                     <p className="ml-2 inline-block">{donation.city}</p>
//                   </div>
//                   <p className="text-gray-700 text-base mb-4">
//                     Posted by: {donation.username}
//                   </p>
//                   <p className="text-gray-700 text-base flex justify-end">
//                     {donation.created_at}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <ReactPaginate
//             className="flex flex-row gap-6 m-10"
//             previousLabel={"Previous"}
//             nextLabel={"Next"}
//             breakLabel={"..."}
//             pageCount={pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination"}
//             subContainerClassName={"pages pagination"}
//             activeClassName={"active"}
//           />
//         </div>
//       </div>{" "}
//     </div>
//   );
// };

// export default Donations;
