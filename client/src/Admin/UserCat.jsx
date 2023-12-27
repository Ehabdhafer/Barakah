// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";

// const UserCategoryChart = () => {
//   const [userCategoryData, setUserCategoryData] = useState([]);

//   useEffect(() => {
//     // Fetch data for user categories
//     axios
//       .get("http://localhost:5000/countuserrole")
//       .then((response) => {
//         setUserCategoryData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user category data:", error);
//       });
//   }, []);

//   const data = {
//     labels: ["Charities", "Recycling Agencies", "Food Providers"],
//     datasets: [
//       {
//         label: "Number of Users",
//         data: userCategoryData.map((item) => item.total_count),
//         backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
//         borderColor: ["#4CAF50", "#2196F3", "#FFC107"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       yAxes: [{ ticks: { beginAtZero: true } }],
//     },
//     legend: { display: false },
//   };

//   return (
//     <div className="text-center ">
//       <h2 className="text-lg font-bold mb-4">Number of Users by Category</h2>
//       {userCategoryData.length > 0 && <Bar data={data} options={options} />}
//     </div>
//   );
// };

// export default UserCategoryChart;
