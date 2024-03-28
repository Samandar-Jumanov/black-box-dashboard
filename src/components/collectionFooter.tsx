// Footer.js
"use client"

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useGlobalContext } from './context';



const CollectionFooter = ({ collectedDate, onAddFeedback } : any ) => {
    const  { isCollectionPage , setIsCollctionsPage } = useGlobalContext()
    


    setIsCollctionsPage(true);

    
    return (
  <Box mt={2}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Collected Date: {new Date(collectedDate).toLocaleDateString()}
    </Typography>
    {isCollectionPage && (
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ mt: 1 }}
        onClick={onAddFeedback}
      >
        Add Feedback
      </Button>
    )}
  </Box>
    )
}

export default CollectionFooter;
