import React from 'react';
import { Typography, Paper, Grid, Button } from '@mui/material';


const CreatedEmails = ( ) => {
  
  const  message = "Your custom response";
  const  creator = "Creator's Name";
  const  createdAt = "Creation Date";
  const  responseName = "Custom response";

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '100px', borderColor: 'black' }}>
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
      <Button color="info" size="small" variant="contained">Update</Button>
    </Paper>
  );
};

export default CreatedEmails;
