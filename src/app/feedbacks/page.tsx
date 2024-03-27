"use client";
import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, CardActionArea, Grid, Avatar, Button, Modal, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For selected items
import { getUserAllFeedbacks } from '@/actions/feedback';
import { IFeedBack } from '@/types/feedBack';
import { useSession } from "next-auth/react";
import Collections from "../collections/page";

const FeedBacks = () => {
  const [userFeedBacks, setUserFeedBacks] = useState<IFeedBack[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const { data: session } = useSession();
  const [isCollectionsPage, setIsCollectionsPage] = useState(true);

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

  const handleCloseCollections = () => {
    setIsCollectionsPage(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '80px', position: 'relative' }}>
      {selected.length > 0 && (
        <Button variant="contained" onClick={() => setIsCollectionsPage(true)}>
          Add to collections
        </Button>
      )}

      {/* Collections Modal */}
      <Modal
        open={isCollectionsPage}
        onClose={handleCloseCollections}
        aria-labelledby="collections-modal-title"
        aria-describedby="collections-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="collections-modal-title" variant="h6" component="h2" marginBottom={2}>
            Collections
          </Typography>
          <Collections />
          <Button onClick={handleCloseCollections} style={{marginTop: '20px'}}>Close</Button>
        </Box>
      </Modal>

      {userFeedBacks.map((each: IFeedBack) => (
        <Card
          elevation={3}
          style={{
            marginBottom: '20px',
            marginTop: '20px',
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
