"use client";

import React from 'react';
import EmailForm from "../../../components/EmailCreateForm";
import { useRouter } from "next/navigation"; 
import { useSession, signIn } from "next-auth/react";
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';

const CreateEmail = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '20vh' }}>
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          You need to be signed in to create an email.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="md">
        <EmailForm userEmail={session?.user?.email} />
      </Container>
    </Box>
  );
};

export default CreateEmail;
