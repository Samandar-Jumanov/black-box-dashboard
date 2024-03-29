"use client"

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useGlobalContext } from './context';



const CollectionFooter = ({ collectedDate, onAddFeedback , onDelete , onUpdateCollectionStatus , seeMore  } : any ) => {
    const  { isCollectionPage , setIsCollctionsPage } = useGlobalContext()
    setIsCollctionsPage(false);


    const deleteCollection = async ( ) =>{
      await  onDelete()
    }


    const changeStatus = async ( ) =>{
         await onUpdateCollectionStatus()
    }
    return (
   <Box mt={2}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Collected Date: {new Date(collectedDate).toLocaleDateString()}
    </Typography>

    <Button onClick={seeMore}>  feedbacks </Button>

    {isCollectionPage == false  && (
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ mt: 1 }}
        onClick={onAddFeedback}
        disabled
      >
        Add Feedback
      </Button>
    )}


    {isCollectionPage === false  && (
           <>  
          <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ mt: 1  , ml :2 }}
          onClick={deleteCollection}
        >
          Delete collection 
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ mt: 1  , ml : 2}}
          onClick={changeStatus}
        >
          Add to progress 
        </Button>
           
            </>

    )}
    
  </Box>
    )
}

export default CollectionFooter;