"use client"

import type { NextPage } from 'next';
import ChartComponent from '@/components/ChartComponent';
import { Box  } from "@mui/material";

const Progress: NextPage = () => {
  const labels = ['January', 'February', 'March', 'April' , 'January', 'February', 'March', 'April','January', 'February', 'March', 'April'];
  const data = [32, 12, 24 , 44, 55, 33, 22, 88, 22, 13, 422, 13, 22]; 

  return (
    <Box  sx ={{ padding: "60px" , marginTop : "100px" }}>
      <ChartComponent labels={labels} data={data} />
    </Box >
  );
};

export default Progress;
