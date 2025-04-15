// import { Link } from "react-router-dom";

import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from './HomePage';

import Slider from './Carousel';

import HomePage from './HomePage'



const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    margin:0,
    padding:0,
    // background:'#fff',
    height:'100vh',



    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
 
   
 
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
    },
    card: {
        maxWidth:250,
        display:'inline-block',
        marginRight:30
    },
    box: {
        background:'#fff',
        borderRadius:'20px',
        width:'750px',
        height:'801px',
        marginTop:'50px',

    },
    background:{
    
    }
  }));


const Public = () => {
    const classes = useStyles();


    const content = (

    <div 
    // className={classes.root}
    >

        {/* <Grid container spacing={0}  >
        </Grid>
        <Grid
        className={classes.background}
        >
        <Navbar />

        <Slider />
        </Grid> */}
        

        <HomePage />
      


        </div>
    )
  return content
}

export default Public
