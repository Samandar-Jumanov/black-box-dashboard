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

interface ChartComponentProps {
  labels: string[];
  data: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ labels, data }) => {

  const borderWidth = 2; 

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Progress',
        data,
        fill: false,
        tension: 0.1,
        borderWidth,
        borderColor :"red"
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
