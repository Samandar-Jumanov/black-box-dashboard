"use client";
import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, CardActionArea, Grid, Avatar, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For selected items
import { getUserAllFeedbacks } from '@/actions/feedback';
import { IFeedBack } from '@/types/feedBack';
import { useSession } from "next-auth/react";

const FeedBacks = () => {
  const [userFeedBacks, setUserFeedBacks] = useState<IFeedBack[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const { data : session } = useSession()

  const selectItem = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result: IFeedBack[] | any = await getUserAllFeedbacks(session?.user?.email as string );
        setUserFeedBacks(result);
      } catch (err: any) {
        console.error({
          error: err.message,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" style={{ marginTop: '80px' }}>
      {userFeedBacks.map((each: IFeedBack) => (
        <Card
          elevation={3}
          style={{
            marginBottom: '20px',
            backgroundColor: selected.includes(each.id) ? '#f0f0f0' : '#fff',
          }}
          key={each.id}
        >
          <CardActionArea onClick={() => selectItem(each.id)}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Feedback from {each.userName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Date: {new Date(each.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    User email: {each.userEmail}
                  </Typography>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                    {each.description}
                  </Typography>
                </Grid>
                {selected.includes(each.id) && (
                  <Grid item>
                    <Avatar>
                      <CheckCircleOutlineIcon color="success" />
                    </Avatar>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
};

export default FeedBacks;
