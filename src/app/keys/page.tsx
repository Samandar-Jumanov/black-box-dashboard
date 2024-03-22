"use client";
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, IconButton, Tooltip, Alert, CircularProgress } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { LayoutPage } from '@/components/layout';
import { ApiKey } from '@/types/apiKey';

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.email) {
      const fetchApiKey = async () => {
        setIsLoading(true); 
        try {
          const encodedEmail = encodeURIComponent(session?.user?.email as string );
          const response = await fetch(`http://localhost:3000/api/key?userEmail=${encodedEmail}`, {
            method: "GET",
          });
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setApiKeys(data);
        } catch (err) {
          console.error('Error fetching API Key:', err);
          toast.error("Failed to fetch API keys.");
          setApiKeys(null); 
        } finally {
          setIsLoading(false);
        }
      };
      fetchApiKey();
    } else {
      setIsLoading(false); 
    }
  }, [session?.user?.email]); 

  

  const copyToClipboard = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast.success("API key copied to clipboard!");
    }).catch((err) => {
      console.error('Failed to copy API key: ', err);
      toast.error("Failed to copy API key.");
    });
  };

  if (!session) {
    return <LayoutPage />;
  }

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '100px' }}>
      <Alert severity="warning" style={{ backgroundColor: 'lightyellow', color: 'black', marginBottom: '20px' }}>
        <Typography variant="body1">
          <strong>Important:</strong> Keep your API keys confidential! Sharing your API keys can lead to unauthorized access to your account, resulting in data loss or theft. Treat them like you would your password, and never share them in publicly accessible areas such as GitHub, social media, or other online platforms.
        </Typography>
      </Alert>

      <Typography variant="body1" style={{ marginBottom: '20px', color: 'green' }}>
        This one API key is on us, and you cannot create another one. It is free for your use.
      </Typography>

      <List>
        {isLoading ? (
          <ListItem>
            <CircularProgress style={{ margin: 'auto' }} />
          </ListItem>
        ) : apiKeys && apiKeys.length > 0 ? (
          apiKeys.map((key) => (
            <ListItem key={key.id} secondaryAction={
              <Tooltip title="Copy API Key">
                <IconButton edge="end" aria-label="copy" onClick={() => copyToClipboard(key.key)}>
                  <FileCopyOutlinedIcon />
                </IconButton>
              </Tooltip>
            }>
              <ListItemText
                primary={key.name}
                secondary={`API Key: ${key.key} - Description: ${key.description} - Created on ${key.createdAt}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No API keys found." />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default ApiKeys;
