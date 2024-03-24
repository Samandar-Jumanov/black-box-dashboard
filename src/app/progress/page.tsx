"use client"

import React , { useState } from 'react';
import { Box } from "@mui/material";
import ChartComponent from '@/components/ChartComponent'; 

const bugs = [
  { id: 1, name: 'Bug 1', description: 'Description of Bug 1', status: 'Added', usersApplied: [3, 1, 6, 4], collectedDate: '2024-03-01' },
  { id: 2, name: 'Bug 2', description: 'Description of Bug 2', status: 'In Progress', usersApplied: [1, 2, 77, 4], collectedDate: '2024-03-02' },
  { id: 3, name: 'Bug 3', description: 'Description of Bug 3', status: 'Added', usersApplied: [1, 32, 88, 8], collectedDate: '2024-03-03' },
  { id: 4, name: 'Bug 4', description: 'Description of Bug 4', status: 'In Progress', usersApplied: [3, 12, 6, 33], collectedDate: '2024-03-04' },
];

const Progress = () => {
  const [ activeProgresses , setActiveProgresses] = useState(bugs)


  // useEffect(() => {
  //      async function fetchProgresses(){
  //       try {
  //          const res = await fetch(`http://localhost:3000/api/getActive/iam@gmail.com`)
  //           console.log(res.json());


  //       }catch(err : any ){
  //            console.log(err)
  //       }
  //      }
  //      fetchProgresses();

       
  // } , [])
  
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr'];

  return (
    <Box sx={{ padding: "60px", marginTop: "100px" }}>
      {activeProgresses.map((bug, index) => {
        return (
          <Box key={bug.id} mb={5}>
            <ChartComponent labels={labels} data={bug.usersApplied} monthIndex={3} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Progress;
