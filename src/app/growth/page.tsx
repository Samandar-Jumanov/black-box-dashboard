"use client"

import type { NextPage } from 'next';
import ChartComponent from '@/components/ChartComponent';

const Growth: NextPage = () => {
  const labels = ['January', 'February', 'March', 'April'];
  const data = [10, 20, 15, 25]; 

  return (
    <div style={{ padding: 20 }}>
      <h1>My Chart</h1>
      <ChartComponent labels={labels} data={data} />
    </div>
  );
};

export default Growth;
