import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ subscribersCount, totalUsersCount }) => {
  const data = {
    labels: ["Subscribers", "Other Users"],
    datasets: [
      {
        data: [subscribersCount, totalUsersCount - subscribersCount],
        backgroundColor: ["#4CAF50", "#B4B4B3"],
        hoverBackgroundColor: ["#45A049", "#B8B4B8"],
      },
    ],
  };

  const options = {
    cutoutPercentage: 70, // Adjust the cutout percentage for the doughnut shape
  };

  return (
    <div className="text-left ml-[25%] mb-10  ">
      {/* <h2 className="text-lg font-bold mb-4 text-blue">
        Subscribers vs. Other Users
      </h2> */}
      <div className="w-[30%] bg-white p-4 rounded-lg">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CircleChart;
