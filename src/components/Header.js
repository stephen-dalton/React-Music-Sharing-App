import { HeadsetRounded } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';



export default function Header() {

  return (
    <AppBar sx={{
      bgcolor: 'background.paper'
    }} position="fixed" >
      <Toolbar>
        <HeadsetRounded />
        <Typography varient="h6" component="h1" sx={{ m: 2 }}>
          React Music Share
        </Typography>
      </Toolbar>
    </AppBar >
  )
}
