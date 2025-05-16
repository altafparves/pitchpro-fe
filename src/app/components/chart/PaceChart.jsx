// "use client";

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // Example timeSeries data
// const timeSeries = [
//   { time: "0s", wpm: 130 },
//   { time: "10s", wpm: 140 },
//   { time: "20s", wpm: 155 },
//   { time: "30s", wpm: 148 },
//   { time: "40s", wpm: 135 },
//   { time: "50s", wpm: 160 },
//   { time: "60s", wpm: 142 },
// ];

// // Extract labels and data
// const labels = timeSeries.map((point) => point.time);
// const wpmData = timeSeries.map((point) => point.wpm);

// // Data for chart
// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Words Per Minute",
//       data: wpmData,
//       fill: false,
//       borderColor: "#9b59b6",
//       backgroundColor: "#9b59b6",
//       tension: 0.3,
//     },
//   ],
// };

// // Chart options
// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   scales: {
//     x: {
//       grid: { display: false },
//     },
//     y: {
//       grid: { display: true },
//       min: 0,
//       ticks: {
//         callback: function (value) {
//           if (value === Math.max(...wpmData)) return "High";
//           if (value === Math.min(...wpmData)) return "Low";
//           return value;
//         },
//       },
//     },
//   },
// };

// export default function PaceChart() {
//   return <Line data={data} options={options} />;
// }

// "use client";

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function PaceChart({ timeSeries = [] }) {
//   const labels = timeSeries.map((point) => point.time);
//   const wpmData = timeSeries.map((point) => point.wpm);
//   console.log("this is wpmData",wpmData);
//   console.log("this is timeSeries", timeSeries);
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Words Per Minute",
//         data: wpmData,
//         fill: false,
//         borderColor: "#9b59b6",
//         backgroundColor: "#9b59b6",
//         tension: 0.3,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       x: { grid: { display: false } },
//       y: {
//         grid: { display: true },
//         min: 0,
//         ticks: {
//           callback: function (value) {
//             if (value === Math.max(...wpmData)) return "High";
//             if (value === Math.min(...wpmData)) return "Low";
//             return value;
//           },
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// }
"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PaceChart({ timeSeries = [] }) {
  const labels = timeSeries.map((point) => point.time);
  const wpmData = timeSeries.map((point) => point.wpm);

  const data = {
    labels,
    datasets: [
      {
        label: "Words Per Minute",
        data: wpmData,
        fill: false,
        borderColor: "#9b59b6",
        backgroundColor: "#9b59b6",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 160,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            if (value === 100) return "Low";
            if (value === 120) return "High";
            return "";
          },
        },
        grid: {
          color: "#ccc",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
