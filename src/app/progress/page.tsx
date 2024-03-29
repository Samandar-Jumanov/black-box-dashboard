"use client";


import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import ChartComponent from '@/components/ChartComponent';
import { useSession } from 'next-auth/react';
import { ICollection } from '@/types/collections';
import {  Typography} from "@mui/material"
const Progress = () => {
  const [userCollections, setUserCollections] = useState<ICollection[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
   
      if(session?.user?.email){
        const fetchUserActiveCollections = async () => {
          const response = await fetch(`/api/all-collections/${session?.user?.email}`);
          const result = await response.json();
          console.log(result)
          setUserCollections(result);
        };
        fetchUserActiveCollections();
      }
  }, [session]); 

  const labels = ['Jan', 'Feb', 'Mar', 'Apr'];

  if( !userCollections || userCollections.length <=0 ) {
       
       return (
         <Typography variant="h6" style={{ textAlign: 'center', marginTop: '80px' }}>
               No progres found  found. Please set active the collection  if it is in progress 
        </Typography>
       )
  }
  return (
    <Box sx={{ padding: "60px", marginTop: "100px" }}>
      {userCollections.filter(bug => bug.status === "Added").map((bug) => (
        <Box key={bug.id} mb={5}>
          <ChartComponent labels={labels} data={22} monthIndex={3} />
        </Box>
      ))}
    </Box>
  );
};

export default Progress;
