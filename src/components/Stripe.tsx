import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Container, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { amber, green, deepPurple } from '@mui/material/colors';
import {  getPrices } from "@/actions/stripe";


const CheckoutForm: React.FC =  async () => {
    const plans = await getPrices()
  const theme = useTheme();
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={5} alignItems="stretch">
        {plans.map((plan) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 450, // Larger card size
                // backgroundColor: plan.bgColor,
                transition: '0.3s',
                boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                '&:hover': {
                  transform: 'scale(1.05)', // Grow effect on hover
                //   boxShadow: `0 16px 70px -12.125px ${plan.btnColor}`,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', pt: theme.spacing(5) }}>
                {/* {plan.icon} */}
                <Typography variant="h4" component="div" gutterBottom>
                  {plan.nickname}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {/* {formatCurrency(plan.amount, plan.currency)} / {plan.interval} */}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: theme.spacing(4) }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    // backgroundColor: plan.btnColor, 
                    color: '#fff', 
                    fontSize: '1.1rem', 
                    padding: '10px 30px', 
                   
                  }}
                >
                  Subscribe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CheckoutForm;
