"use client";
// Import necessary components and hooks
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
import { LayoutPage } from "@/components/layout";
import { useSession } from "next-auth/react";
import type { NextPage } from 'next';
import { useRouter }  from "next/navigation";

const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(12),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  height: `calc(100vh - ${theme.spacing(12)})`, 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CenteredBox = styled(Box)({
  textAlign: 'center', 
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter()

  if (!session) {
    return <LayoutPage />;
  }

  return (
    <MainContainer  maxWidth="xs" sx = {{
        mt : 8 
    }}>
      <CenteredBox>
        <Typography variant="h5" component="h1" gutterBottom>
          Get Started with Creating API Keys
        </Typography>
        <Typography variant="body1" gutterBottom>
          Creating an API key enables you to harness the full potential of our services. 
          Discover tools and resources to pinpoint and address areas for improvement.
        </Typography>
        <StyledButton variant="contained" size="large" onClick={() => router.push("/api-key")}>
          Create an API Key
        </StyledButton>
      </CenteredBox>
    </MainContainer>
  );
};

export default Home;
