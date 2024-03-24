"use client"

import React, { useState  , useEffect } from 'react';
import { Box, Grid, Paper, Typography, Chip, IconButton, Menu, MenuItem, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import bugs from '@/utils/dummyBugsData';
import { useSession } from 'next-auth/react';
import axios from "axios"
import { ICollection } from '@/types/collections';
const StyledInfoText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
}));




const Collections = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBugId, setSelectedBugId] = useState <string | null>(null);
  const { data : session } = useSession();
  const [ userCollections , setUserCollections ] = useState<ICollection[] | null >(null)


  const handleClick = (event : any   , id : string  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBugId(id);
  };

  const handleClose = ( id :  any   , status : string  ) => {
    setAnchorEl(null);
    setSelectedBugId(null);

    if(status === "Added") {
         console.log({
           status : status,
           message : "Should be removed from progress"
         })
    }else {
      console.log({
        status : status,
        message : "Should be add to progess "
      });
    }
  };


  useEffect(() => {
    async function fetchAllCollections(){
        if(session?.user?.email) { 
            const url = `http://localhost:3000/api/all-collections/${session.user.email}`;
            try {
                const response = await fetch(url);
                if (!response.ok) { // Check if response is ok (status in the range 200-299)
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); 
                setUserCollections(data);
            } catch (error) {
                console.error("There was a problem with fetch operation:", error);
            }
        } else {
            console.log("Session or user email is undefined.");
        }
    }

    fetchAllCollections();
}, [session?.user?.email]); 


  return (
    <Box sx={{ flexGrow: 1, padding: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Collections
      </Typography>
      <StyledInfoText>
        These collections are gathered by your users.
      </StyledInfoText>
      <Grid container spacing={2}>
        {userCollections?.map((bug) => (
          <Grid item xs={12} sm={6} key={bug.id} maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
              <IconButton
                aria-label="settings"
                sx={{ position: 'absolute', right: 8, top: 8 }}
                onClick={(e) => handleClick(e, "bug.id")}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && selectedBugId === "bug.id" }
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose("bug.id" , bug.status)}>{bug.status === "Added" ? "Remove from Progress" : "Add to progress" }</MenuItem>
              </Menu>
              <Typography variant="h6" component="h2">
                {bug.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {bug?.description || "This area should hold bug description "} 
              </Typography>
              <Typography variant="body2" gutterBottom>
                Users Applied: {bug.usersApplied}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Collected Date: {bug.createdAt}
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
