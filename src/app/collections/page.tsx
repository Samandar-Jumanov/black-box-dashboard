"use client"

import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Chip, IconButton, Menu, MenuItem, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import bugs from '@/utils/dummyBugsData';

const StyledInfoText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
}));

const Collections = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBugId, setSelectedBugId] = useState <number | null>(null);


  const handleClick = (event : any   , id : number ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBugId(id);
  };

  const handleClose = ( id :  number  , status : string  ) => {
    setAnchorEl(null);
    setSelectedBugId(null);

    if(status === "Added") {
         console.log({
           bug : bugs[id],
           status : status,
           message : "Should be removed from progress"
         })
    }else {
      console.log({
        bug : bugs[id],
        status : status,
        message : "Should be add to progess "
      });
    }
  };






  return (
    <Box sx={{ flexGrow: 1, padding: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Collections
      </Typography>
      <StyledInfoText>
        These collections are gathered by your users.
      </StyledInfoText>
      <Grid container spacing={2}>
        {bugs.map((bug) => (
          <Grid item xs={12} sm={6} key={bug.id} maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
              <IconButton
                aria-label="settings"
                sx={{ position: 'absolute', right: 8, top: 8 }}
                onClick={(e) => handleClick(e, bug.id)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && selectedBugId === bug.id}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose(bug.id , bug.status)}>{bug.status === "Added" ? "Remove from Progress" : "Add to progress" }</MenuItem>
              </Menu>
              <Typography variant="h6" component="h2">
                {bug.name}
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
              <Chip label={bug.status} color={bug.status === 'Added' ? 'success' : 'warning'} sx={{ marginTop: 1 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Collections
