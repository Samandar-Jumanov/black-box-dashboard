"use client"

import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation'; 
import { useSession } from 'next-auth/react';
import { IResponseEmail } from '@/types/responseText';
import {  toast } from "react-hot-toast";
import { deleteEmail } from '@/actions/email';
import  {  UserCreateEmails } from "@/components/userCreatedEmails";

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
          const response = await fetch(`/api/emails/${session?.user?.email}`);
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


  const removeEmail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await deleteEmail(id, session?.user?.email as string);
      console.log(res);
  
      setIsLoading(!(res === "Deleted"));
    } catch (err: any) {
      console.error({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };
  
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
      <Box display="flex" justifyContent="flex-end" mb={4} mt={4}>
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
         
         <UserCreateEmails  responseEmails={responseEmails}  removeEmail={removeEmail} />
    </Box>

  );
};

export default CreatedEmails;
