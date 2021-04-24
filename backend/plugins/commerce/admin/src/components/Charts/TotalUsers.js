import React from "react";
import { Line } from "react-chartjs-2";


export default function OrderChart({ data }) {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: `Total unique users: ${data.length}`,
        data: [],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  data.forEach((element) => {
    if (chartData.labels.includes(element.date)) {
      const idx = chartData.labels.findIndex(
        (el, idx) => el == element.date && idx
      );
      chartData.datasets[0].data[idx] += 1;
    } else {
      chartData.labels.push(element.date);
      chartData.datasets[0].data.push(1);
    }
  });
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
