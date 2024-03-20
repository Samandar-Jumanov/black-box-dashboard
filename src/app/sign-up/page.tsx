"use client"

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 
  const [ organizationName , setOrganizationName] = useState<string>("");

  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setLoading(true)
      try {

        if(!email || !password  ) {
           toast.error("Invalid inputs  ")
           setLoading(false)
           return
        }

        await signIn('credentials', {
          redirect: true,
          email : email,
          password : password ,
          signup: "false"

        }).then((res ) =>{
          toast.success("Account created successfully")
          router.push('/growth');
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
        Welcome !
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
              name="organizationName"
              label="organizationName"
              type="organizationName"
              id="organizationName"
              autoComplete="new-organizationName"
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

export default LoginPage;
