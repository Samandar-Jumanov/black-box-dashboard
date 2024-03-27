import React from "react";
import { Typography, Button, Stack } from "@mui/material";

export const CollectionNamesTable = () => {
  const collectionNames = ["Purchase issue", "Sell issue", "Account issue"];

  const handleAddClick = (collectionName: string) => {
    console.log(`Add clicked for ${collectionName}`);
  };

  
  return (
    <Stack spacing={2} sx={{ maxWidth: 360, margin: 'auto', mt: 4 }}>
      {collectionNames.map((each: string) => (
        <Stack key={each} direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{each}</Typography>
          <Button variant="contained" color="primary" onClick={() => handleAddClick(each)}>
            Add
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
