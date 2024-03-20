"use client"
import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, IconButton, Tooltip, Alert } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { toast } from "react-hot-toast";

const initialApiKeys = [
  {
    id: 1,
    name: 'Key 1',
    description: 'Description for Key 1',
    createdAt: '2024-03-20',
    createdBy: 'Admin',
    apiKey: '12345-abcdefg-67890-hijklmn'
  }
];

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);

  const copyToClipboard = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast.success("API key copied to clipboard!");
    }).catch((err) => {
      console.error('Failed to copy API key: ', err);
      toast.error("Failed to copy API key.");
    });
  };

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '100px' }}>
      <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
        API Keys
      </Typography>

      <Alert severity="warning" style={{ backgroundColor: 'lightyellow', color: 'black', marginBottom: '20px' }}>
        <Typography variant="body1">
          <strong>Important:</strong> Keep your API keys confidential! Sharing your API keys can lead to unauthorized access to your account, resulting in data loss or theft. Treat them like you would your password, and never share them in publicly accessible areas such as GitHub, social media, or other online platforms.
        </Typography>
      </Alert>

      <Typography variant="body1" style={{ marginBottom: '20px', color: 'green' }}>
        This one API key is on us, and you cannot create another one. It is free for your use.
      </Typography>

      <List>
        {apiKeys.map((key) => (
          <ListItem key={key.id} secondaryAction={
            <Tooltip title="Copy API Key">
              <IconButton edge="end" aria-label="copy" onClick={() => copyToClipboard(key.apiKey)}>
                <FileCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
          }>
            <ListItemText
              primary={key.name}
              secondary={`API Key: ${key.apiKey} - Description: ${key.description} - Created by ${key.createdBy} on ${key.createdAt}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ApiKeys;
