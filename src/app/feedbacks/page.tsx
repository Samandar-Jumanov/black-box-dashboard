import React from 'react';
import { Typography, Paper, Container } from '@mui/material';
import { getUserAllFeedbacks } from '@/actions/feedback';
import { IFeedBack } from '@/types/feedBack';

const FeedBacks =  async () => {

  const result : IFeedBack[] |  any  = await getUserAllFeedbacks("iam@gmail.com");

  return (
    <Container maxWidth="xl" style={{ marginTop: '80px' }}>
       {result.map((each : IFeedBack  ) => (
        <Paper elevation={3} style={{ padding: '20px' }} key={each.id}>
             <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>
               Feedback from {each.userName}
             </Typography>
             <Typography variant="body1" component="p" style={{ marginBottom: '10px' }}>
             Date : {new Date(each.createdAt).toLocaleDateString()}
             </Typography>
             <Typography variant="body1" component="p" style={{ marginBottom: '10px' }}>
               user email : {each.userEmail}
             </Typography>
             <Typography variant="body2" component="p" style={{ whiteSpace: 'pre-wrap' }}>
               {each.description}
             </Typography>
           </Paper>
       ))}
    </Container>
  );
};

export default FeedBacks;
