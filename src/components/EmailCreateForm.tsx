"use client"

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; 

const EmailForm = ({ userEmail, collectionOptions = ['Purchasing issue ', 'Customer Feedback', 'Service Inquiry'] } : any ) => {
  const [responseText, setResponseText] = useState('');
  const [collectionName, setCollectionName] = useState(collectionOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateEmail = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        responseText,
        collectionName,
        userEmail,
      };

      const response = await fetch('https://black-box-dashboard.vercel.app/api/emails/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to create email');
      }

      toast.success('Email created successfully');
      router.push('/emails'); 
    } catch (error) {
      console.error('Error creating email:', error);
      toast.error('Error creating email');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: '40px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create Email
      </Typography>
      <TextField
        fullWidth
        required
        margin="normal"
        label="Response Text"
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Collection Name</InputLabel>
        <Select
          value={collectionName}
          label="Collection Name"
          onChange={(e) => setCollectionName(e.target.value)}
          disabled={isLoading} 
        >
          {collectionOptions.map((option : string ) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button 
        onClick={handleCreateEmail} 
        variant="contained" 
        color="primary" 
        disabled={isLoading} 
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      <Button 
        onClick={() => router.push('/emails')} 
        variant="outlined" 
        color="secondary"
        disabled={isLoading} 
      >
        Back to Emails
      </Button>
    </Container>
  );
};

export default EmailForm;
