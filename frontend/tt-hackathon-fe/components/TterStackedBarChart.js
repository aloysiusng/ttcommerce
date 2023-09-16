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
        label: "Surface Pro",
        data: [0, 5, 5, 0, 0, 9],
        backgroundColor: "rgba(254, 44, 85, 0.6)",
      },
      {
        label: "Wireless Headphones",
        data: [3, 4, 8, 7, 9, 5],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Game Console",
        data: [5, 3, 8, 7, 9, 3],
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "LIGE Digital Watch",
        data: [4, 0, 0, 2, 5, 0],
        backgroundColor: "rgba(254, 129, 85, 0.6)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Trend of top products this month",
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
