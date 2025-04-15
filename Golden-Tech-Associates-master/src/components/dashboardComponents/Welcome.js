import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import './Welcome.css'
import * as React from "react";
import { 
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
  styled,
  Paper,


} from '@mui/material'

import SearchInput from "./searchInput";
import ChartLine from "./ChartLine";
import PersonalInfo from "./PersonalInfo";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Golden Tech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Welcome = () => {


  const { isManager, isAdmin,username } = useAuth();

  const date = new Date();

  const today = new Intl.DateTimeFormat("en-PS", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const img1 = "./img77.jpg"


  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Toolbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
        <SearchInput />
        <Box className="bg">

        <Typography
          variant="h5"
          sx={{
            color:'#FFF',
            borderRadius:'10px',
            display:'block',
            marginTop:'20px',
            

          }}
          >
          Hi,{username} you are in the Dashboard for Softix System.
        </Typography>
        <Typography
        variant="h6"
        sx={{
          color:'#fff',
          
        }}
        >
        {today}
        </Typography>
        </Box>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height:'max-content',
            }}
          >
            <ChartLine />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <PersonalInfo />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        {/* <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* <Orders /> */}
          {/* </Paper> */}
        {/* </Grid> */} 
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  </Box>



    
  );
};

export default Welcome;


