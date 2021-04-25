import React from "react";
import { Line } from "react-chartjs-2";

export default function TotalUsersByTime({ data }) {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: `Total unique users per day`,
        data: [],
        fill: false,
        backgroundColor: "rgb(43, 142, 76)",
        borderColor: "rgba(43, 142, 76, 0.2)",
      },
    ],
  };
  data.forEach((user) => {
    if (chartData.labels.includes(user.date)) {
      chartData.labels.findIndex((el, idx) => {
        if (el == user.date) {
          chartData.datasets[0].data[idx] += 1;
        }
      });
    } else {
      chartData.labels.push(user.date);
      chartData.datasets[0].data.push(1);
    }
  });

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
