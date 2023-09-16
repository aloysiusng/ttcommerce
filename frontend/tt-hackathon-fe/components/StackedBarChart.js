import React from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

const StackedBarChart = ({}) => {
  // Register required Chart.js components
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  // Define sample data
  const labels = ["April", "May", "June", "July", "August", "Current Month"];

  const data = {
    labels,
    datasets: [
      {
        label: "Wireless Headphones",
        data: [2, 3, 3, 5, 2, 10],
        backgroundColor: "rgba(254, 44, 85, 0.6)",
      },
      {
        label: "Digital Camera",
        data: [3, 4, 8, 14, 9, 13],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Oral B Pro 100",
        data: [5, 3, 8, 14, 9, 7],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total products sold per month",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
