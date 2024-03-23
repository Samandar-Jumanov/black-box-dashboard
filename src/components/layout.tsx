import React from 'react';
import { Button, Typography, Box, Container } from "@mui/material";

export const LayoutPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{
                textAlign: 'center',
                my: 12,
                p: 4,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
            }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Join us! Find your weak area
                </Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Enhance your experience by engaging directly with the development process. Contribute towards creating a flawless product.
                </Typography>

                <Typography variant="body1" paragraph>
                    This platform empowers users to report bugs and share feedback, fostering continuous improvement
                </Typography>
                
                <Box sx={{ textAlign: 'left', ml: 3 }}>
                    <Typography variant="body1" component="div">• <b>Issue Collection:</b> Automatic capture of user-reported issues.</Typography>
                    <Typography variant="body1" component="div">• <b>Progress Tracking:</b> Visual updates on issue resolutions.</Typography>
                    <Typography variant="body1" component="div">• <b>Feedback Review:</b> Insights into user satisfaction and suggestions for improvement.</Typography>
                    <Typography variant="body1" component="div">• <b>Email Notifications:</b> Direct communication for reported issues.</Typography>
                </Box>

                <Button variant="contained" color="primary" href="/sign-up" sx={{ mt: 3 }}>
                    Sign Up Now
                </Button>
            </Box>
        </Container>
    );
};
