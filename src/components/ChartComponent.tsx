// ChartComponent.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


const ChartComponent = ({ labels, data , monthIndex } : {labels : string[], data : number , monthIndex : number }) => {



  const char = [22, 11, 44, 22 , 33, 22, 11, 88, 66,533 ,22, 0]

  const chartData = {
    labels, 
    datasets: [
      {
        label: 'Weekly User Feedback',
        data: char,
        fill: false,
        tension: 0.1,
        borderWidth: 2,
        borderColor: "blue",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
