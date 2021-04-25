import React from "react";
import { Bar } from "react-chartjs-2";

export default function OrderTotalByTime({ data }) {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: "Order total average",
        data: [],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Number of orders",
        data: [],
        fill: false,
        backgroundColor: "rgb(0, 126, 255)",
        borderColor: "rgba(0, 126, 255, 0.2)",
      },
    ],
  };
  data.forEach((element) => {
    if (chartData.labels.includes(element.created_at.slice(0, 10))) {
      const idx = chartData.labels.findIndex(
        (el, idx) => el == element.created_at.slice(0, 10) && idx
      );
      chartData.datasets[0].data[idx] += parseInt(element.total);
      chartData.datasets[1].data[idx] += 1;
    } else {
      chartData.labels.push(element.created_at.slice(0, 10));
      chartData.datasets[1].data.push(1);
      chartData.datasets[0].data.push(parseInt(element.total));
    }
  });
  chartData.datasets[0].data.map((idx)=> {
    chartData.datasets[0].data[idx] /= chartData.datasets[1].data[idx]
  })
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}
