"use client"

import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, CardActionArea, Grid, Avatar, Button, Drawer, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getUserAllFeedbacks } from '@/actions/feedback';
import { IFeedBack } from '@/types/feedBack';
import { useSession } from "next-auth/react";
import Collections from '../collections/page';
import { useGlobalContext } from '@/components/context';

const FeedBacks = () => {
  const [userFeedBacks, setUserFeedBacks] = useState<IFeedBack[]>([]);
  const { data: session } = useSession();
  const [isCollectionsPage, setIsCollectionsPage] = useState(false);
  const { setCollectionId, collectionId } = useGlobalContext();

  const selectItem = (id: string) => {
    setCollectionId(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    if (session?.user?.email) {
      const fetchData = async () => {
        try {
          const result: IFeedBack[] | any = await getUserAllFeedbacks(session?.user?.email as string);
          setUserFeedBacks(result);
        } catch (err: any) {
          console.error({
            error: err.message,
          });
        }
      }
      fetchData();
    }
  }, [session?.user?.email]);

  const handleToggleCollections = () => {
    setIsCollectionsPage(!isCollectionsPage);
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '80px' }}>
      {collectionId.length > 0 && (
        <Button variant="contained" onClick={handleToggleCollections}>
          Add to collections
        </Button>
      )}

      <Drawer
        anchor="right"
        open={isCollectionsPage}
        onClose={handleToggleCollections}
        variant="persistent"
        sx={{
          width: '75%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '75%',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{ overflow: 'auto' }}
          role="presentation"
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Collections
          </Typography>
          <Collections />
          <Button onClick={handleToggleCollections} sx={{ m: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Drawer>

      {userFeedBacks.length > 0 ? (
        userFeedBacks.map((each: IFeedBack) => (
          <Card
            elevation={3}
            style={{
              marginBottom: '20px',
              marginTop: '20px',
              backgroundColor: collectionId.includes(each.id) ? '#f0f0f0' : '#fff',
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
                  {collectionId.includes(each.id) && (
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
        ))
      ) : (
        <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
          No feedbacks found.
        </Typography>
      )}
    </Container>
  );
};

export default FeedBacks;
