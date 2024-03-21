"use client"
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Link
} from '@mui/material';
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email : string ) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
      );
  };

  const handleSubmit = async (e : any ) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        toast.error("Please enter all fields");
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Invalid email format");
        setLoading(false);
        return;
      }

      await signIn('credentials', {
        redirect: false,
        email,
        password,
      }).then((res : any ) => {
        if (res.error) {
          toast.error(res.error);
          setLoading(false);
        } else {
          toast.success("Logged in successfully");
          router.push('/');
        }
      });
    } catch (error : any ) {
      toast.error(`Login failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 12}}>
      <Typography component="h1" variant="h5" textAlign="center" mb={4}>
        Welcome back, one step to improvement
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              error={!validateEmail(email) && email.length > 0}
              helperText={!validateEmail(email) && email.length > 0 ? "Please enter a valid email" : ""}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, position: 'relative' }}
            >
              Login
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
      </Box>
      <Button href="/sign-up" >
            Do not own an account? Sign up
      </Button>
    </Container>
  );
};

export default LoginPage;
