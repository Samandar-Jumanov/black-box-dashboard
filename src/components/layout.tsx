import React from 'react';
import { Button, Typography, Box, Container } from "@mui/material";

export const LayoutPage = () => {
    return (
        <Container maxWidth="sm">  
            <Box sx={{ textAlign: 'center', my: 12 }}>  
               
                <Typography variant="body1" gutterBottom>
                    This site is for you. Let's make everything better, together.
                </Typography>
                <Button variant="contained" color="primary" href="/sign-up">Sign Up</Button>
            </Box>
        </Container>
    );
};
