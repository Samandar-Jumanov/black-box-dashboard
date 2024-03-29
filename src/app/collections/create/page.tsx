// Use client-side indication
"use client";

import { Button, CircularProgress, Grid, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import { Box, Container } from '@mui/system';
import { addCollection  } from "@/actions/collections";

const FormComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    setIsLoading(true);
    try {
      // Assuming `addCollection` returns a promise.
      const res = await addCollection("iam@gmail.com", inputValue);
      // Assuming `res` contains some success indicator. Adjust based on your actual API response.
      if (res  === "Created") {
        toast.success("Collection created successfully!");
        router.push('/collections');
      } else {
        toast.error( "Failed to create collection.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the collection.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop : "100px"}}>
      <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Create Collection
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            A collection is about starting to grow and getting user feedbacks. It is  the first step in engaging your audience and iterating based on their insights.
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="collectionName"
                label="Collection Name"
                name="collectionName"
                autoComplete="collection-name"
                autoFocus
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2, mb: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  Submit
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormComponent;
