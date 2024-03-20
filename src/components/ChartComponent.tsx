// components/ChartComponent.tsx
"use client"

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ChartComponentProps {
  labels: string[];
  data: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ labels, data }) => {
  const borderColor = data.length > 1 ? (data[data.length - 1] > data[data.length - 2] ? 'green' : 'red') : 'green';

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Your Data Label',
        data,
        fill: false,
        borderColor,
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
