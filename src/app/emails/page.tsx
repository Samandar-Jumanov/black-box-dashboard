"use client"



import React from 'react';
import { Typography, Paper, Grid, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";


const CreatedEmails = () => {

  const router = useRouter();



  const emails = [
    { message: "Email message 1", creator: "Alice", createdAt: "2023-03-26", responseName: "Response 1" },
    { message: "Email message 2", creator: "Bob", createdAt: "2023-03-27", responseName: "Response 2" },
  ];

  return (
    <Box mt="40px" sx={{ flexGrow: 1  , padding : "40px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
             color="primary" 
             aria-label="add" 
             size="large" 
             variant="contained" onClick={() => router.push("/emails/create")}>
              <AddIcon />
            </Button>
          </Box>
        </Grid>
        {emails.map((email, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: '20px', minHeight: '150px', maxWidth: "400px" }}>
              <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
                {email.responseName}
              </Typography>
              <Typography variant="body1" component="p">
                {email.message}
              </Typography>
              <Typography variant="overline" display="block">
                Created by: {email.creator}
              </Typography>
              <Typography variant="overline" display="block">
                On: {email.createdAt}
              </Typography>
              <Button color="primary" size="small" variant="contained" style={{ marginTop: '20px' }}>
                Update
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreatedEmails;
