import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback'; // Importing the Feedback icon
import { IFeedBack } from "@/types/feedBack";

interface LastFeedBackProps {
  collectionFeedBacks: IFeedBack[];
}

export const LastFeedBack = ({ collectionFeedBacks }: LastFeedBackProps) => {
  const theme = useTheme(); // Using the theme for consistent styling
  const lastFeedback = collectionFeedBacks[collectionFeedBacks.length - 1];

  if (!lastFeedback) {
    return (
      <Box sx={{
        p: theme.spacing(2),
        backgroundColor: '#e8f5e9', // Light green background
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
      }}>
        <FeedbackIcon color="action" />
        <Typography variant="body1">No Feedback Available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      p: theme.spacing(2),
      backgroundColor: '#e8f5e9', 
      borderRadius: theme.shape.borderRadius,
    }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {lastFeedback.description}
      </Typography>
    </Box>
  );
};
