import React from "react";
import { Line } from "react-chartjs-2";


export default function OrderChart({ data }) {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: "Order total",
        data: [],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  data.forEach((element) => {
    if (chartData.labels.includes(element.created_at.slice(0, 10))) {
      const idx = chartData.labels.findIndex(
        (el, idx) => el == element.created_at.slice(0, 10) && idx
      );
      chartData.datasets[0].data[idx] += parseInt(element.total);
    } else {
      chartData.labels.push(element.created_at.slice(0, 10));
      chartData.datasets[0].data.push(parseInt(element.total));
    }
  });
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
