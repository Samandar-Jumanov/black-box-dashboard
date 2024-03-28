import React from 'react';
import { getCollection } from "@/actions/collections";
import IssueCard from "@/components/collectionCard";
import { Box, Typography } from "@mui/material";

const Collection = async ({ params } :any ) => {
    const collectionId = params.collectionId;
    console.log({
        collectionId: collectionId
    });

    const result = await getCollection(collectionId as string);
    console.log({
        result: result
    });

    if (!result || result.length === 0) { 
        return (
            <Box sx={{ marginTop: "70px", textAlign: "center" }}>
                <Typography variant="h5">No feedbacks  found.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ marginTop: "70px" }}>
            {result?.map((each: any, index: number) => (
                <React.Fragment key={index}>
                    <IssueCard issue={each} />
                </React.Fragment>
            ))}
        </Box>
    );
}

export default Collection;
