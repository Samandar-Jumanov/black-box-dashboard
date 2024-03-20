"use client"
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { signIn } from "next-auth/react";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Use boolean state for loading

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); 
    await signIn("credentials" ,  {
      isSignUp : "true",
      organizationName : organizationName ,
      email : email ,
      password : password 
    })
      .then((res: any) => {
        console.log({
          credentials: res,
        });
      })
      .catch((err: any) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false); 
      });
      
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="organizationName"
              label="Organization Name"
              name="organizationName"
              autoComplete="org-name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, position: 'relative' }}
              disabled={loading}
            >
              Sign Up
              {loading && (
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
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignupPage;
