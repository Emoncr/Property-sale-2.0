import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const GraphicalIndication = ({ primaryColor, fundraisingData }) => {
  // Prepare data
  const allDonations = [
    { createdAt: "2024-08-30T12:00:00Z", amount: 0 },
    { createdAt: "2024-09-01T12:00:00Z", amount: 100 },
    { createdAt: "2024-09-02T12:00:00Z", amount: 300 },
    { createdAt: "2024-09-03T12:00:00Z", amount: 150 },
    { createdAt: "2024-09-04T12:00:00Z", amount: 250 },
    { createdAt: "2024-09-05T12:00:00Z", amount: 80 },
  ];

  const targetDonation = 1000; // Set target to achieve 80% with the dummy data

  const dates = [];
  const percentages = [];
  const donationsByDate = {};

  allDonations.forEach((donation) => {
    const date = new Date(donation.createdAt).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    if (!donationsByDate[date]) {
      donationsByDate[date] = 0;
    }
    donationsByDate[date] += parseFloat(donation.amount);
  });

  // Sort dates and calculate cumulative percentages
  const sortedDates = Object.keys(donationsByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  let cumulativeAmount = 0;
  sortedDates.forEach((date) => {
    cumulativeAmount += donationsByDate[date];
    dates.push(date);
    percentages.push((cumulativeAmount / targetDonation) * 100);
  });

  // Chart.js configuration
  const data = {
    labels: dates,
    datasets: [
      {
        data: percentages,
        fill: true,
        backgroundColor: primaryColor,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 50,
          callback: function (value) {
            return value + " %";
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="flex items-end pb-5 gap-5">
        <div className="chart-container mx-auto" style={{ width: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
      <div>
        {/* Amount Raised */}
        <div className="mb-4 mt-6 bg-[#FBFBFB] rounded-lg p-2 px-4">
          <div className="text-sm font-medium font-primary">
            Raised of ${fundraisingData.goal}
          </div>
          <div className="text-base font-medium text-black font-primary">
            ${fundraisingData.raised}
          </div>
        </div>
        {/* Supporters */}
        <div className="mb-4 mt-4 bg-[#FBFBFB] rounded-lg p-2 px-4">
          <div className="text-sm font-medium font-primary">Supporters</div>
          <div className="text-base font-medium text-black font-primary">
            {fundraisingData.supporters}
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphicalIndication;
