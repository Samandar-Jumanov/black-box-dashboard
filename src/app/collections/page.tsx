import React from 'react';
import { Box, Grid, Paper, Typography, Chip, Button } from '@mui/material';

// Updated bugs data with status, usersApplied, and collectedDate
const bugs = [
  { id: 1, title: 'Bug 1', description: 'Description of Bug 1', status: 'Added', usersApplied: 3, collectedDate: '2024-03-01' },
  { id: 2, title: 'Bug 2', description: 'Description of Bug 2', status: 'In Progress', usersApplied: 5, collectedDate: '2024-03-02' },
  { id: 3, title: 'Bug 3', description: 'Description of Bug 3', status: 'Added', usersApplied: 2, collectedDate: '2024-03-03' },
  { id: 4, title: 'Bug 4', description: 'Description of Bug 4', status: 'In Progress', usersApplied: 4, collectedDate: '2024-03-04' },
];

const Collections = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Collections
      </Typography>
      <Grid container spacing={2}>
        {bugs.map((bug) => (
          <Grid item xs={12} sm={6} key={bug.id} maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" component="h2">
                {bug.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {bug.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Users Applied: {bug.usersApplied}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Collected Date: {bug.collectedDate}
              </Typography>
              <Button>More about bug</Button>
              <Chip label={bug.status} color={bug.status === 'Added' ? 'success' : 'warning'} sx={{ marginTop: 1 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Collections;
