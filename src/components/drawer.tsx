"use client"


import React from 'react';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport'; // For Collected Problems
import EmailIcon from '@mui/icons-material/Email'; // For Created Emails
import ShowChartIcon from '@mui/icons-material/ShowChart'; // For Growth
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // For API Keys
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from "@mui/icons-material/Feedback"
import { signOut, useSession } from 'next-auth/react';
import { useGlobalContext } from './context';
import MuiLink from '@mui/material/Link'; 
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const SideBarDrawer = () => {
  const { setOpen } = useGlobalContext();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    if(session) {
      signOut().then(() => {
        toast.success("Logged out successfully");
        router.push("/")
      }).catch((err) => {
        console.log({ logOutError: err.message })
        toast.error("Something went wrong");
      })
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <List>
      { session ? (
        <>
          <ListItemButton onClick={handleDrawerClose}>
            <MuiLink underline="none" color="inherit" sx={{ display: 'flex', width: '100%' }} href="/collections">
              <ListItemIcon><BugReportIcon /></ListItemIcon>
              <ListItemText primary="Issues collected" />
            </MuiLink>
          </ListItemButton>
          <Divider />

          <ListItemButton onClick={handleDrawerClose}>
            <MuiLink underline="none" color="inherit" sx={{ display: 'flex', width: '100%' }} href="/feedbacks">
              <ListItemIcon> <FeedbackIcon />  </ListItemIcon>
              <ListItemText primary="Recieved feedbacks" />
            </MuiLink>
          </ListItemButton>
          <Divider />


          <ListItemButton onClick={handleDrawerClose}>
            <MuiLink underline="none" color="inherit" sx={{ display: 'flex', width: '100%' }} href="/created-emails">
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText primary="Created emails" />
            </MuiLink>
          </ListItemButton>
          <Divider />

          <ListItemButton onClick={handleDrawerClose}>
            <MuiLink underline="none" color="inherit" sx={{ display: 'flex', width: '100%' }} href="/progress">
              <ListItemIcon><ShowChartIcon /></ListItemIcon>
              <ListItemText primary="Progress" />
            </MuiLink>
          </ListItemButton>
          <Divider />

          <ListItemButton onClick={handleDrawerClose}>
            <MuiLink underline="none" color="inherit" sx={{ display: 'flex', width: '100%' }} href="/keys">
              <ListItemIcon><VpnKeyIcon /></ListItemIcon>
              <ListItemText primary="API keys" />
            </MuiLink>
          </ListItemButton>
          <Divider />

          <ListItemButton onClick={handleSignOut}>
            <Button color="error" variant="contained" size="medium" startIcon={<LogoutIcon />} sx={{ width: '100%' }}>
              Log out
            </Button>
          </ListItemButton>
        </>
      ) : 
      (
        <ListItemButton onClick={handleSignOut}>
        <Button color="info" variant="contained" size="medium"  sx={{ width: '100%' }}>
         Sign in 
        </Button>
      </ListItemButton>
     )
      }
     
    </List>
  );
};
