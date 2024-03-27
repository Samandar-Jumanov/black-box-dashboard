import React from 'react';
import { Box, Grid, Paper, Typography, Chip, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ICollection } from '@/types/collections';
import { LastFeedBack } from '@/components/LastFeedBack';

interface UserCollectionsProps {
  bug: ICollection;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  handleClose: (id: string, status: string) => void;
  anchorEl: null | HTMLElement;
  selectedBugId: string | null;
  email: string;
  isCollectionsPage: boolean;
}

export const UserCollections: React.FC<UserCollectionsProps> = ({
  bug,
  handleClick,
  handleClose,
  anchorEl,
  selectedBugId,
  email,
  isCollectionsPage,
}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 8, marginTop: "30px" }} key={bug.id}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} key={bug.id} sx={{ maxWidth: 'xs' }}>
          <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
            <IconButton
              aria-label="settings"
              sx={{ position: 'absolute', right: '8px', top: '8px' }}
              onClick={(e) => handleClick(e, bug.id)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedBugId === bug.id}
              onClose={() => handleClose(bug.id, bug.status)}
            >
              <MenuItem onClick={() => handleClose(bug.id, bug.status)}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={bug.status}
                    color={bug.status === 'Added' ? 'success' : 'warning'}
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  {bug.status === 'Added' ? 'Remove from Progress' : 'Add to Progress'}
                </Box>
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="h2">
              {bug.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {bug.description || 'This area should hold bug description'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Users Applied: 244
            </Typography>

            <LastFeedBack collectionFeedBacks={bug.feedbacks} />

            <Typography variant="body2" gutterBottom>
              Collected Date: {bug.createdAt}
            </Typography>
           
            {!isCollectionsPage && (
              <Button 
                variant="contained" 
                color="success" 
                size="small" 
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                Add feedbacks
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
