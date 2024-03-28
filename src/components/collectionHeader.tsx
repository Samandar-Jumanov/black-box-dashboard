// Header.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const CollectionHeader = ({ name, status }: any) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
      {name}
    </Typography>
    {status === "Added" ? (
      <Typography variant="h6" sx={{ color : "green"}}>
        {status}
      </Typography>
    ) : (
      <Typography variant="h6" sx={{color : "red"}}>
        {status}
      </Typography>
    )}
  </Box>
);

export default CollectionHeader;
