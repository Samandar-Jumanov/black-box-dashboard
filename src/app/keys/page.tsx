"use client"

import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { toast } from "react-hot-toast"
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

  const addApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `Key ${apiKeys.length + 1}`,
      description: `Description for Key ${apiKeys.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'User',
      apiKey: Math.random().toString(36).substring(2, 15) // Generates a random string; replace with your actual API key generation logic
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const copyToClipboard = (apiKey : string ) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast.success("Aki key copied  to clipboard")
    });
  };

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '100px' }}>
      <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
        API Keys
      </Typography>
      {/* <Button variant="contained" startIcon={<AddIcon />} onClick={addApiKey} style={{ marginBottom: '20px' }}>
        Add API Key
      </Button> */}
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
