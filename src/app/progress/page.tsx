"use client"

import React from 'react';
import { Box } from "@mui/material";
import ChartComponent from '@/components/ChartComponent'; // Ensure this points to your ChartComponent file

// Assuming this bugs data is imported or defined somewhere in your project
const bugs = [
  { id: 1, name: 'Bug 1', description: 'Description of Bug 1', status: 'Added', usersApplied: [3, 1, 6, 4], collectedDate: '2024-03-01' },
  { id: 2, name: 'Bug 2', description: 'Description of Bug 2', status: 'In Progress', usersApplied: [1, 2, 77, 4], collectedDate: '2024-03-02' },
  { id: 3, name: 'Bug 3', description: 'Description of Bug 3', status: 'Added', usersApplied: [1, 32, 88, 8], collectedDate: '2024-03-03' },
  { id: 4, name: 'Bug 4', description: 'Description of Bug 4', status: 'In Progress', usersApplied: [3, 12, 6, 33], collectedDate: '2024-03-04' },
];

const Progress = () => {
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr'];

  return (
    <Box sx={{ padding: "60px", marginTop: "100px" }}>
      {bugs.map((bug, index) => {
        return (
          <Box key={bug.id} mb={5}>
            <ChartComponent labels={labels} data={bug.usersApplied} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Progress;
