import React from "react";
import { Bar } from "react-chartjs-2";

export default function UserRatesByTime({ data }) {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: `Bounce rate in %`,
        data: [],
        backgroundColor: "rgba(255,0,255,0.5)",
      },
      {
        label: `Abandoned cart in %`,
        data: [],
        backgroundColor: "rgb(230,230,250)",
      },
      {
        label: `Checkout in %`,
        data: [],
        backgroundColor: "rgb(54,69,79)",
      },
    ],
  };
  let userCounter = [];
  data.forEach((user) => {
    if (chartData.labels.includes(user.date)) {
      chartData.labels.findIndex((el, idx) => {
        if (el == user.date) {
          user.bounce && (chartData.datasets[0].data[idx] += 1);
          user.status == "cart" && (chartData.datasets[1].data[idx] += 1);
          user.status == "checkout" && (chartData.datasets[2].data[idx] += 1);
          userCounter[idx] += 1;
        }
      });
    } else {
      chartData.labels.push(user.date);
      user.bounce
        ? chartData.datasets[0].data.push(1)
        : chartData.datasets[0].data.push(0);
      user.status == "cart"
        ? chartData.datasets[1].data.push(1)
        : chartData.datasets[1].data.push(0);
      user.status == "checkout"
        ? chartData.datasets[2].data.push(1)
        : chartData.datasets[2].data.push(0);
      userCounter.push(1);
    }
  });

  chartData.datasets[0].data.map((el, idx) => {
    chartData.datasets[0].data[idx] /= userCounter[idx];
    chartData.datasets[1].data[idx] /= userCounter[idx];
    chartData.datasets[2].data[idx] /= userCounter[idx];
  });
  return (
    <div>
      <h1>
        <b>User rates</b>
      </h1>
      <Bar data={chartData} />
    </div>
  );
}
