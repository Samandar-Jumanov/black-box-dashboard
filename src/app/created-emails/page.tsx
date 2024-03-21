import React from 'react';
import { Typography, Paper, Grid , Button  } from '@mui/material';



type Email = {
   message : string ,
   creator : string,
   createdAt : string ,
   responseName: string 
};


const CreatedEmails = ({ message = "Your custom response ", creator = "Creator's Name", createdAt = "Creation Date"  , responseName ="Custom response "} : Email ) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin : "100px", borderColor : "black"}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            {responseName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" component="p">
            {message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline" display="block">
            Created by: {creator}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline" display="block">
            On: {createdAt}
          </Typography>
        </Grid>
      </Grid>
      <Button color="info" size="small" variant="contained">  Update </Button>
    </Paper>
  );
};

export default CreatedEmails;
