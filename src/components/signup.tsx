"use client"
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setLoading(true)
      try {
        console.log({
           email : email ,
           name : name ,
           password : password 
        });


        if(!email || !password ||  !name ) {
           toast.error("Invalid inputs  ")
           setLoading(false)
           return
        }

        await signIn('credentials', {
          redirect: true,
          email :"email",
          password :"password" ,
          name : "name" ,
          signup: "true"
        }).then((res ) =>{
          toast.success("Account created successfully")
        }).catch((err : any ) =>{
          toast.error(err.message)
        })

        
      }catch(error : any ){
       toast.error(`Cannot create an account ${error.message}`)
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        Sign up
      </Typography>
      <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              id="name"
              label="Organization Name"
              name="name"
              autoComplete="org-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
