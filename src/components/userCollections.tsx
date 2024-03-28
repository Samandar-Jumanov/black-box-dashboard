import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import CollectionHeader from './collectionHeader';
import CollectionContent from './collectionContent';
import CollectionFooter from './collectionFooter';
import { ICollection } from '@/types/collections';

interface UserCollectionsProps {
  bug: ICollection;
  addToCollections: (id: string) => void;
  routeToCollection: (id: string) => void;
  updateCollectionStatus : ( id : string , status : string ) => void 
}

export const UserCollections: React.FC<UserCollectionsProps> = ({
  bug,
  addToCollections,
  routeToCollection,
  updateCollectionStatus
}) => {
 

  const onAddFeedback = (e : any ) => {
    e.stopPropagation();
    addToCollections(bug.id);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, mt: 8 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Paper elevation={3} sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }
          }} onClick={() => routeToCollection(bug.id)}>
            <CollectionHeader name={bug.name} status={bug.status} />
            <CollectionContent description={bug.description} usersApplied={bug.usersApllied} feedbacks={bug.feedbacks} />
            <CollectionFooter collectedDate={bug.createdAt} 
               onAddFeedback={onAddFeedback} 
               status={bug.status}
               updateCollectionStatus={updateCollectionStatus}
               />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
