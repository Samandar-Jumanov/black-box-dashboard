"use client"

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'; 
import { useSession } from 'next-auth/react';
import { IResponseEmail } from '@/types/responseText';
import {  toast } from "react-hot-toast";


const CreatedEmails = () => {
  const router = useRouter();
  const [responseEmails, setResponseEmails] = useState<IResponseEmail[] | null> (null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const fetchResponseEmails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://black-box-dashboard.vercel.app/api/emails/${session?.user?.email}`);
          if (!response.ok) throw new Error('Failed to fetch emails');
          const data = await response.json();
          setResponseEmails(data);
        } catch (error) {
          toast.error("Failed to fetch  response emails")
          console.error(error);

          setResponseEmails(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResponseEmails();
    }
  }, [session?.user?.email]);


  if (isLoading ) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" mt="100px">
        <CircularProgress />
      </Box>
    );
  };

  if (!responseEmails ||  responseEmails?.length <= 0 ) {
    return (
      <Box mt="130px" textAlign="center">
        <Typography variant="h5">No emails found</Typography>
        <Button  variant="contained" size="large" onClick={() => router.push("/emails/create")}> Create one </Button>
      </Box>
    );
  }

  return (
    <Box mt="40px" sx={{ flexGrow: 1, padding: '20px' }}>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          color="primary"
          aria-label="add"
          size="large"
          variant="contained"
          onClick={() => router.push('/emails/create')}
          startIcon={<AddIcon />}
        >
          Create Email
        </Button>
      </Box>
      <Grid container direction="column" spacing={2}>
        {responseEmails.map((email, index) => (
          <Grid item key={index} xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
                {email.collectionName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {email.responseText}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                Created by: <Typography variant="body2" component="span" sx={{ fontWeight: 'medium' }}>{email.userEmail}</Typography>
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                On: {new Date(email.createdAt).toLocaleDateString()}
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button color="primary" size="small" variant="text">
                  Update
                </Button>
                <Button color="error" size="small" variant="text" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    
  );
};

export default CreatedEmails;
