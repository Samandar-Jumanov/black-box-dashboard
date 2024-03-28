// Content.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import {LastFeedBack} from '@/components/LastFeedBack';


const CollectionContent = ({ description, usersApplied, feedbacks } : any ) => (
  <Box flex="1">
    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
      {description || 'This area should hold bug description'}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
      Users Applied: {usersApplied}
    </Typography>
    <LastFeedBack collectionFeedBacks={feedbacks} />
  </Box>
);

export default CollectionContent;
