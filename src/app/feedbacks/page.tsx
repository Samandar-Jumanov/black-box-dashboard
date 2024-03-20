import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

const feedbackData = {
  userName: "John Doe",
  dateSent: "2024-03-21",
  feedbackText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const FeedBacks = () => {
  return (
    <Container maxWidth="xl" style={{ marginTop: '80px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>
          Feedback from {feedbackData.userName}
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: '10px' }}>
          Date: {feedbackData.dateSent}
        </Typography>
        <Typography variant="body2" component="p" style={{ whiteSpace: 'pre-wrap' }}>
          {feedbackData.feedbackText}
        </Typography>
      </Paper>
    </Container>
  );
};

export default FeedBacks;
