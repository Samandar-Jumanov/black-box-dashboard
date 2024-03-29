"use client";

import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
import { LayoutPage } from "@/components/layout";
import { useSession } from "next-auth/react";
import type { NextPage } from 'next';
import { useRouter }  from "next/navigation";
import  CheckoutForm  from "@/components/Stripe"

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
    <MainContainer  maxWidth="xl" sx = {{
        mt : 8 
    }}>
      <CenteredBox>
        <Typography variant="h5" component="h1" gutterBottom>
          Get Started with  API Keys
        </Typography>
        <Typography variant="body1" gutterBottom>
          GET an API key enables you to harness the full potential of our services. 
          Discover tools and resources to pinpoint and address areas for improvement.
        </Typography>
        <StyledButton variant="contained" size="large" onClick={() => router.push("/keys")}>
          GET an API Key
        </StyledButton>
      </CenteredBox>
      {/* <  CheckoutForm /> */}
    </MainContainer>
  );
};

export default Home;
