"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales } from "chart.js";

import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data
const data = {
  labels: [0, 1, 2, 3, 4],
  datasets: [
    {
      label: "Monthly Sales",
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: "#0055B2",
      tension: 0.1,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    x: {
      display: true, 
      grid: {
        display: false,
      },
    },
    y: {
      display: true, // optional: hides y-axis
      grid: {
        display: true,
      },
    },
  },
};

export default function LineChart() {
  return <Line data={data} options={options} />;
}
