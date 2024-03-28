"use client";


import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import ChartComponent from '@/components/ChartComponent';
import { useSession } from 'next-auth/react';
import { ICollection } from '@/types/collections';

const Progress = () => {
  const [userCollections, setUserCollections] = useState<ICollection[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
   
      if(session?.user?.email){
        const fetchUserActiveCollections = async () => {
          const email = session?.user?.email 
          const response = await fetch(`/api/all-collections/${session?.user?.email}`);
          const result = await response.json();
          console.log(result)
          setUserCollections(result);
        };
        fetchUserActiveCollections();
      }
  }, [session]); 

  const labels = ['Jan', 'Feb', 'Mar', 'Apr'];

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
